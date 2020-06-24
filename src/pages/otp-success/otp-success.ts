import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { MemberloginPage } from '../memberlogin/memberlogin';

/**
 * Generated class for the OtpSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp-success',
  templateUrl: 'otp-success.html',
})
export class OtpSuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private events:Events) {
  }

  /**
   * Go back to login screen
   */
  loginpage(){
	   this.navCtrl.push('MemberloginPage')
    //this.events.publish('setRoot',MemberloginPage);
  }

}
