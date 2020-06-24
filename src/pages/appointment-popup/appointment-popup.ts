import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ToastController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { CancelRefundPopupPage } from '../cancel-refund-popup/cancel-refund-popup';
import { ComposeemailPage } from '../composeemail/composeemail';


/**
 * Generated class for the AppointmentPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointment-popup',
  templateUrl: 'appointment-popup.html',
})
export class AppointmentPopupPage {
  appState = AppState;
  isAddress: boolean;
  appointment: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private apiProvider: ApiProvider, private modalCtrl: ModalController,private toastCtrl:ToastController) {
    this.appointment = navParams.data;
  }

  ionViewDidEnter() {
    if (this.appointment.status != '5') {
      if (this.appointment.hasOwnProperty('reschedule') && this.appointment.reschedule && this.appState.IsMember)
        document.getElementById('reschedule').style.display = 'block';
      if (this.appointment.status == '3')
        document.getElementById('cancel').innerText = 'Cancelled/Refunded';
      if (this.appointment.status == '7' && !this.appState.IsMember)
        document.getElementById('cancel').innerText = 'Cancelled';
      if (new Date(new Date(this.appointment.start).getTime() - new Date().getTime()).getHours() > 48)
        document.getElementById('cancel').style.display = 'none';
      if (this.appState.IsMember && this.appointment.status == '8') {
        document.getElementById('confirmReschedule').style.display = 'none';
        document.getElementById('cancel').style.display = 'block';
      }
      if (!this.appState.IsMember && this.appointment.status == '8') {
        document.getElementById('confirmReschedule').style.display = 'none';
        document.getElementById('cancel').style.display = 'none';
      }
      if (new Date(this.appointment.start).getTime() <= new Date().getTime()) {
        document.getElementById('cancel').style.display = 'none';
        document.getElementById('confirmReschedule').style.display = 'none';
        document.getElementById('reschedule').style.display = 'none';
      }
    }
    else {
      document.getElementById('cancel').style.display = 'none';
      document.getElementById('confirmReschedule').style.display = 'none';
      document.getElementById('reschedule').style.display = 'none';
    }
  }

  /**
   * Dismiss popup
   */
  closePopup() {
    this.viewCtrl.dismiss();
  }

  /**
   * Cancel appointment
   */
  async cancelAppointment() {
    if (this.appointment.status != "3" && this.appointment.status != "7") {
      let companyid: string;
      if (!AppState.IsWemaLife)
        companyid = AppState.UserCred.currentCompanyId;
      else
        companyid = this.appointment.companyid;

      var request =
        {
          Action: "Checkcancel",
          AppointmentId: this.appointment.id.split('_')['1'],
          CompanyId: companyid,
          ApptSource: this.appointment.apptsource
        };

      let response = await this.apiProvider.Post(AppConst.CANCEL_APPOINTMENT, request).toPromise();
      if (response != null && response.hasOwnProperty('status')&&response['status']) {
        this.toastCtrl.create({
          message:'Appointment cancelled',
          duration:2000
        }).present();
        if (AppState.IsMember) {
          if (this.appointment.paidstatus) {
            if (response['policy'].type == "2" && response['policy'].credits)
              this.appointment['orderCancellationType'] = "3";
            else
              this.appointment['orderCancellationType'] = "5";
          }
          else
            this.appointment['orderCancellationType'] = "5";

          this.viewCtrl.dismiss({ appointment: this.appointment, cancelResult: response, flag: 'updateAppointments', msg: 'cancel' });
        }
        else
          this.viewCtrl.dismiss({ flag: 'updateAppointments' });
      }
    }
  }

  /**
   * Send email to provider
   */
  sendEmail(){
    var data = 
    {
        emailId : AppState.IsMember ? this.appointment.providerdetails.firstname+' '+ this.appointment.providerdetails.lastname : this.appointment.memberdetails.firstname+' '+ this.appointment.memberdetails.lastname,
        userId : AppState.IsMember ? this.appointment.providerdetails.id : this.appointment.memberdetails.id,
        disableEmailSearch:true
      };
    this.navCtrl.push('ComposeemailPage',data);
  }
}
