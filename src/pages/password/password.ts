import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController ,ViewController, ToastController} from 'ionic-angular';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { AppConst } from '../../AppConst';
import { ApiProvider } from '../../providers/api/api';
import { RetrieveVerificationPage } from '../retrieve-verification/retrieve-verification';
//import { RestProvider } from '../../providers/rest/rest';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AppState } from '../../AppStates';
/**
 * Generated class for the PasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})

export class PasswordPage {
  email: string;
  userservice:any;
  responseData: any;
  number=9999401224;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private viewCtrl: ViewController ,private apiProvider :ApiProvider,private taostCtrl :ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }

/**
   * Reset password
   */
reset()
{
  this.reset1();
}

  async reset1() {
    console.log(AppState.DeviceToken)
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.email)) {
      var request = {
        emailid: this.email,
        firebase_id:AppState.DeviceToken,
        action: "Forgot"

      };
      var response = await this.apiProvider.Post(AppConst.FORGOT_PASSWORD, request).toPromise();
      if (response != null && response.hasOwnProperty('status') && response['status'] == true) {
        this.responseData=true
       this.varifynumber();

      //  var credential = firebase.auth.PhoneAuthProvider.credential(verificationId, SMS_code);
        this.taostCtrl.create(
          {
            message: 'Otp sent on your registered mobile.',
            duration: 2000
          }).present();
          this.navCtrl.push('RetrieveVerificationPage',{userId:response['userid'],email:this.email});
      }
      else {
        this.email='';
        this.alertCtrl.create({
          message: response['message'],
        }).present();
      }
    }
    else {
      this.alertCtrl.create({
        message: "Inavlid email!",
        buttons: [
          {
            text: "OK",
            role: 'cancel'
          }
        ]

      }).present();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }



  varifynumber() {
    //Step 2 - Pass the mobile number for verification

    // this.utils.presentToast('Sending OTP to your mobile number',3000, 'middle');
   // var keyword = event.target.value;


   //console.log(this.registerForm.value);
    if(this.number)
      {
     //  let appVerifier = this.recaptchaVerifier;
       // this.Isformsubmit = true;
      //  console.log("capcha value = "+appVerifier)
         let number ="+91" +this.number;
         console.log(number);
      // this.rest.addData('registerAlldata',this.registerForm.value).subscribe(
       //  res => {
          var  i = 1;
          // this.responseData  = res;
           if (this.responseData == true) {

               console.log(number);
               (<any>window).FirebasePlugin.verifyPhoneNumber(number, 60, (credential) => {
                  console.log(credential.verificationId);
                   var verificationId = credential.verificationId
                   if(i == 2)
                   {
                  //  this.openpopup(verificationId)
                   // this.submitbtn = true;
                   }

                   console.log("value  of  i =" + i);

                 //  this.navCtrl.push('OtpverifyPage',{verificationId:verificationId});
               },
               error => {
                console.log("erorr to send verify code");
                console.log(error);
              })
              i++;
            }



        //    else if(this.responseData.status === '401')
        //    {
        //       this.utils.presentToast(this.responseData.message, 3000, 'middle');
        //      return false;
        //    }

        //    else if(this.responseData.status === '202')
        //    {
        //      this.utils.presentToast(this.responseData.message, 3000, 'middle');
        //      return false;
        //    }


        //  }, error => {
        //    this.utils.presentToast(error.statusText, 3000, 'middle');
        //  });


      }

   }
}
