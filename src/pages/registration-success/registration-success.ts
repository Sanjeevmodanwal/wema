import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { MemberloginPage } from '../memberlogin/memberlogin';

/**
 * Generated class for the RegistrationSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration-success',
  templateUrl: 'registration-success.html',
})
export class RegistrationSuccessPage {

  company:any;
  emailId:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private events:Events) {
    this.company=navParams.get('company')==null?'Welcome to Wema Life':'Welcome to '+navParams.get('company');
    this.emailId=navParams.get('emailId');
  }

  /**
   * Navigate to login page
   */
  login(){
    this.events.publish('setRoot',MemberloginPage);
  }

}
