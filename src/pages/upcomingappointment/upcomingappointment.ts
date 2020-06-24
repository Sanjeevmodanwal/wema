import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UpcomingappointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upcomingappointment',
  templateUrl: 'upcomingappointment.html',
})

export class UpcomingappointmentPage {
  upcomming:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.upcomming=navParams.data
    console.log(navParams.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpcomingappointmentPage');
  }

}
