import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AppConst } from '../../AppConst';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { ResetpasswordPage } from '../resetpassword/resetpassword';


/**
 * Generated class for the RetrieveVerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-retrieve-verification',
  templateUrl: 'retrieve-verification.html',
})
export class RetrieveVerificationPage {

  image: string = AppState.IsMember ? "assets/imgs/verification.png" : "assets/imgs/verificationpro.png";
  otp: string;
  IsActivateNow: boolean;
  data:any;
  email:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider, private alertCtrl: AlertController,private toastCtrl:ToastController) {
    this.data=navParams.data;
    this.email = this.data.email;
    //this.IsActivateNow = this.navParams.get('IsActivateNow');
    //this.userId = this.navParams.get('userId');
  }

  /**
   * Resend otp to mobile
   */
  async resendOtp() {
    var request = {
      UserId: this.data.userId,
      firebase_id:AppState.DeviceToken,
    };
   var response= await this.apiProvider.Post(AppConst.RESEND_CODE,request).toPromise();
   if(response['status']==true){
     this.toastCtrl.create({
       message:"Verification code sent successfully",
       duration:2000
     }).present();
   }
  }

  /**
   * Submit the otp & proceed
   */
  async proceed() {
    if (this.otp == null || this.otp == '') {
      this.alertCtrl.create({
        message: 'Please enter otp!',
        buttons: ['OK']
      }).present();
    }
    else {
      var request = {
        userid: this.data.userId,
        action:'Verify',
        code: this.otp
      };
      var response = await this.apiProvider.Post(AppConst.FORGOT_PASSWORD, request).toPromise();
      if (response!=null && response['status'] == true) {
        this.navCtrl.push('ResetpasswordPage',{userId:this.data.userId})
      }
      else{
        this.alertCtrl.create({
          message:response['message']
        }).present();
      }
    }
  }
}
