import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { AppConst } from '../../AppConst';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the EmailVerifyPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email-verify-popup',
  templateUrl: 'email-verify-popup.html',
})
export class EmailVerifyPopupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,private apiProvider:ApiProvider,private toastCtrl:ToastController) {
  }

  /**
   * Dismiss popup
   */
  dismiss(flag: boolean) {
    if (flag)
      this.viewCtrl.dismiss(flag);
    else {
      let request = {
        UserId: AppState.UserCred.userid,
        CompanyId: AppState.UserCred.currentCompanyId
      };
      let response = this.apiProvider.Post(AppConst.RESEND_EMAIL, request).toPromise();
      if (response != null && response['status'])
        this.toastCtrl.create({
          message: 'Activation Mail has been sent to your mail',
          duration: 2000
        }).present();
    }
  }

}
