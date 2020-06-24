import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,AlertController,ToastController } from 'ionic-angular';
//import { AutoCompleteService } from 'ionic2-auto-complete';
//import { CareServiceDataProvider } from "../../providers/CareServiceDataProvider";
//import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
//import { AppConst } from '../../AppConst';
import { CarePlanBookingPage } from '../care-plan-booking/care-plan-booking';
/**
 * Generated class for the CarePlanFilterPopUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-care-plan-filter-pop-up',
  templateUrl: 'care-plan-filter-popup.html',
})
export class CarePlanFilterPopupPage {
  services: any;
  filteredServices: any;
  times = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00",
    "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
  durations = ["1 hour", "2 hours", "3 hours", "4 hours", "5 hours", "6 hours", "7 hours", "8 hours"];
  filter:any;
  filteredCompanies: any;
  isServiceVisible = false;
  isCompanyVisible = false;
  serviceKeyword = '';
  companyKeyword = '';
  date: any;
  time: any;
  duration: any;
  selectedService: any;
  data: { service: any, duration: string, time: string,endTime:string, date: string };
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private toastCtrl: ToastController, private apiProvider: ApiProvider) {
    this.date = new Date().toISOString();
    this.services=navParams.data.services;
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarePlanFilterPopUpPage');
  }

  ionViewDidEnter() {
    
  }

  dismiss() {
    this.viewCtrl.dismiss(this.data);
  }

  /**
   * Care services autocomplete
   */
  searchService() {
    this.isServiceVisible = true;
    if (this.serviceKeyword != '')
      this.filteredServices = this.services.filter(item => item.servicename.toLowerCase().startsWith(this.serviceKeyword.toLowerCase()));
    else
      this.filteredServices = this.services;
  }
 
  /**
   * Care services item selector
   * @param service 
   */
  serviceSelectedItem(service) {
    this.isServiceVisible = false;
    this.serviceKeyword = service['servicename'];
    this.selectedService = service;
  }

  /**
   * Company item selector
   * @param company
   */
 
  /**
   * Hide the suggestion list
   */
  hideSuggestionList() {
    this.isServiceVisible = false;
    this.isCompanyVisible = false;
  }

  /**
   * Check availability
   */
  checkAvailability() {
    if (this.selectedService != null && this.time != null && this.duration != null) {
      this.data = {
        service: this.selectedService,
        date: this.date,
        time: this.time,
        duration: this.duration,
        endTime:(parseInt(this.time.split(':')['0'])+1).toString()+':'+this.time.split(':')['1']
      };
      this.viewCtrl.dismiss(this.data);
    }
    else
      this.alertCtrl.create({
        message: "Please select service, time & duration to proceed",
        buttons: ['Ok']
      }).present();
    this.navCtrl.push('CarePlanBookingPage')
    }
}
