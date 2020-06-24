import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompanyProfilePage } from '../company-profile/company-profile';

/**
 * Generated class for the AppointmenthistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointmenthistory',
  templateUrl: 'appointmenthistory.html',
})
export class AppointmenthistoryPage {
  doneAppointments: any;
  missedAppointments: any;
  isDoneAppointmentsEmpty :boolean= true;
  isMissedAppointments :boolean= true;
  Header: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("=========AppointmenthistoryPage=========");
    console.log(navParams.data)
    console.log("=========AppointmenthistoryPage=========");
    this.doneAppointments=navParams.data.Done
    this.missedAppointments=navParams.data.Missed
    this.Header=navParams.data.header
    
    if(this.doneAppointments.length > 0){ this.isDoneAppointmentsEmpty = false; }
    if(this.missedAppointments.length > 0){ this.isMissedAppointments = false; }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppointmenthistoryPage');
  }
  BookAgain(done)
  {
    this.navCtrl.push('CompanyProfilePage',done)
  }
}
