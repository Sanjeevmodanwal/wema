import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { PasswordSuccessPage } from '../password-success/password-success';
import { MemberloginPage } from '../memberlogin/memberlogin';

/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {
  confirmPassword: any;
  public type = 'password';
  public type1 = 'password';
  public showPass = false;
  public showPass1 = false;
  password: any;
  isMatched: boolean = true;
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.data = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetpasswordPage');
  }

  SubmitPass()
  {
    this.submit()
  }
  async submit() {
    //var re = /^(?=.*[0-9])(?=.*[A-Z])([A-Z0-9]+)([a-z]*)$/;
    var re = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;
    
    if (re.test(this.password) && this.isMatched) {
      console.log('matched');
      var request = {
        userid: this.data.userId,
        action: "Change",
        newpassword: this.password
      };
      var response = await this.apiProvider.Post(AppConst.FORGOT_PASSWORD, request).toPromise();
      if (response != null && response['status'])
        this.navCtrl.push('PasswordSuccessPage');
    }
    else {
      this.alertCtrl.create({
        title: 'Wrong Password!',
        message: 'Special character is not allowed & confirm password should be matched'
      }).present();
    }
  }

   /**
   * Password show toggle
   */
  showPassword() {
    this.showPass = !this.showPass;

    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }
  /**
   * Password show toggle
   */
  showPassword1() {
    this.showPass1 = !this.showPass1;

    if (this.showPass1) {
      this.type1 = 'text';
    } else {
      this.type1 = 'password';
    }
  }
  /**
   *Confirm Password match
   */
  passwordChange() {
    if (this.password != this.confirmPassword) {
      this.isMatched = false;
    }
    else {
      this.isMatched = true;
    }
  }
  Loginpage()
  {
    this.navCtrl.push('MemberloginPage')
  }
}
