import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MemberloginPage } from '../memberlogin/memberlogin';


/**
 * Generated class for the PasswordSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-success',
  templateUrl: 'password-success.html',
})
export class PasswordSuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  loginpage(){
    this.navCtrl.push('MemberloginPage')
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordSuccessPage');
  }

}
