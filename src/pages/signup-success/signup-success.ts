
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { OtpSuccessPage } from '../otp-success/otp-success';
import { RegistrationSuccessPage } from '../registration-success/registration-success';
/**
 * Generated class for the SignupSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-success',
  templateUrl: 'signup-success.html',
})
export class SignupSuccessPage {
  data: { name: string, status: string,userid:any} ={ name: null, status: null, userid: null };
  name:any;
  userid:any;
  status:any;
  email: string;
  otp: string;
  IsActivateNow: boolean;
  userId: string;
  company:any;

 
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider, private alertCtrl: AlertController,private toastCtrl:ToastController) {

    console.log("userdata",navParams.data)
    if(navParams.data!=null)
    {
       this.userid  = navParams.data.data['userid'];
       this.name    = navParams.data.data['name'];
       this.status  = navParams.data.data['status'];
       
    }

   // this.userid  = 432;
    //   this.name    = '4444 5555';
    //   this.status  = 'true';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupSuccessPage');
  }

  /**
   * Resend otp to mobile
   */
  async resendOtp() {
    var request = {
      userid: this.userid,
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

     if(this.otp == undefined){
      this.alertCtrl.create({
        message: 'Enter valid otp!',
        buttons: ['OK']
      }).present();
     }else{
      this.alertCtrl.create({
        message: 'Enter otp!',
        buttons: ['OK']
      }).present();
    }


    }
    else {
      var request = {
        userid: this.userid,
        code: this.otp
      };
      var response = await this.apiProvider.Post(AppConst.VERIFY_CODE, request).toPromise();
      if (response!=null && response.hasOwnProperty('status')&& response['status']) {
        if (AppState.IsMember) {
          this.navCtrl.push('OtpSuccessPage', { IsActivateNow: this.IsActivateNow })
        }
        else {
          if (this.IsActivateNow) {
            this.navCtrl.push('OtpSuccessPage', { IsActivateNow: this.IsActivateNow })
          }
          else {
            this.navCtrl.push('RegistrationSuccessPage', { IsActivateNow: this.IsActivateNow,emailId:this.email,company:this.company })
          }
        }
      }else if(response!=null && response.hasOwnProperty('status')&& !response['status']){
        this.alertCtrl.create({
          message: response['message']
        }).present();
      }
    }
  }

}
