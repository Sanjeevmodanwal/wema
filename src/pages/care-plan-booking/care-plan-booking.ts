import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, AlertController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { DatePipe } from '@angular/common';
import { CarePlanPopupPage } from '../care-plan-popup/care-plan-popup';
import { AdhocCheckoutPage } from '../adhoc-checkout/adhoc-checkout';
//import { CarePlanFilterPopupPage } from '../care-plan-filter-popup/care-plan-filter-popup';


/**
 * Generated class for the CarePlanBookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-plan-booking',
  templateUrl: 'care-plan-booking.html',
})
export class CarePlanBookingPage {
  items: any = [];
  data: any;
  slotTimes = [];
  carePlanSlots = [];
  providerAvailability: any;
  public appState = AppState;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, private datePipe: DatePipe, private toastCtrl: ToastController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
  this.ionViewDidLoad();
  }


  ionViewDidLoad() {
    console.log('in care plan booking page ',this.navParams.data)
    this.data = this.navParams.data;
    console.log('ionViewDidLoad SubscriptionplanPage');
    this.getAvailability(); 
  }


  /**
   * Cart click handler
   */
  viewCart() {
    this.navCtrl.push('AdhocCheckoutPage');
  }


  ionViewDidEnter() {
  
  }

  /**
   * Get provider availability
   */
  async getAvailability() {
    var request =
    {
      CompanyId: this.data['companyid'],
      Date: this.datePipe.transform(this.data.date, "yyyy-MM-dd"),
      Duration: '2',//this.data.duration.ToString(),
      ServiceId: this.data.service.serviceid,
      Time: this.data.time,
      Type: "day",
      Booking: "2",
      Allslot: 1,
    };
    var response = await this.apiProvider.Post(AppConst.GET_CARE_PLAN_PROVIDER_AVAILABILITY, ).toPromise();
    if (response != null && response != '') {
      this.providerAvailability = response['records']['0'];
      let available = response['records']['0']['available'];
      let i: number = 0;
      for (var key in available) {
        var slots = available[key].time;
        var rates = available[key].rate;
        this.slotTimes = [];
        let j: number = 0;
        for (let s in slots) {
          let slot = { date: key, time: slots[s], price: rates[slots[s]] };
          slot['isSelected'] = false;
          slot['selectedColor='] = '#08a79d';
          let selectedSlot = this.carePlanSlots.filter(x => x.date = slot.date && x.time == slot.time).length > 0 ? this.carePlanSlots.filter(x => x.date = slot.date && x.time == slot.time)['0'] : null;
          if (selectedSlot != null) {
            slot['isSelected'] = true;
            slot['selectedColor'] = '#FDB913';
          }
          this.slotTimes.push(slot);
          j++;
        }
      }
    }
  }

  /**
   * Book slot
   */
  book(bookTime: any) {
    if (!bookTime.isselected && this.data.service.remainighours == 0) {
      alert("You don't have credits");
      return;
    }

    var canBooktime = new Date(new Date().getTime() + (30 * 60 * 1000));
    var hm = bookTime.time.split(':');
    var hours = parseInt(hm[0]);
    var minute = parseInt(hm[1]);
    if (canBooktime.getDate() == new Date(bookTime.date).getDate()) {
      var totalMinutes = canBooktime.getHours() * 60 + canBooktime.getMinutes();
      var totalBookedMinutes = hours * 60 + minute;
      if (totalBookedMinutes < totalMinutes) {
        this.toastCtrl.create({
          message: 'You can book the appointment only for upcoming time',
          duration: 2000
        }).present();
        return;
      }
    }

    var carePlanPopup = this.modalCtrl.create('CarePlanPopupPage', { bookTime: bookTime, searchData: this.data });
    carePlanPopup.onDidDismiss((data) => {
      if (data != null && data.flag == 'request') {
        if (data.bookTime.isSelected) {
          this.carePlanSlots = this.carePlanSlots.filter(x => x.date != data.bookTime.date && x.time != data.bookTime.time);
          data.bookTime.isSelected = false;
          this.data.service.remainighours += data.searchData.duration;
          data.bookTime.selectedColor = '#08a79d';
        }
        else {
          data.bookTime.isSelected = true;
          this.data.service.remainighours -= data.searchData.duration;
          data.bookTime.selectedColor = '#FDB913';
          this.carePlanSlots.push(data.bookTime);
        }
        this.getAvailability();
      }
    });
    carePlanPopup.present();
  }

  /**
   * Confirm booking of subscription plan
   */
  confirmBooking() {
    let appointments = [];
    this.carePlanSlots.forEach((slot) => {
      if (slot.isSelected) {
        var hm = slot.time.split(':');
        var endTime = (parseInt(hm[0]) + this.data.duration) + ':' + hm[1];

        appointments.push(
          {
            CompanyId: this.data.companyId,
            MemberId: AppState.UserCred.UserId,
            Date: this.datePipe.transform(slot.date, "yyyy-MM-dd"),
            ServiceId: this.data.service.serviceid,
            OrderItemId: this.data.service.orderitemid,
            StartTime: slot.time,
            EndTime: endTime,
            OrderId: this.data.orderId,
            PlanId: this.data.planId
          });
      }
    });

    if (appointments.length == 0) {
      alert("Please set the appointment before confirm booking");
      return;
    }

    this.alertCtrl.create({
      message: 'Do you want to confirm booking?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            let request = {
              Request: appointments,
              CreatedBy: AppState.UserCred.UserId,
              CompanyId: this.data.companyId
            };
            this.apiProvider.Post(AppConst.REQUEST_CARE_PLAN_BOOKING, request).subscribe((response) => {
              if (response != null && response['status'])
                alert('Your booking request has been sent.')
              else
                alert('Booking failed');
            });
          }
        },
        'No'
      ],
    })
  }
}