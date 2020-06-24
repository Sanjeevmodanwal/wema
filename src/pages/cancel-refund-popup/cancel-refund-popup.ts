import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';

/**
 * Generated class for the CancelRefundPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cancel-refund-popup',
  templateUrl: 'cancel-refund-popup.html',
})
export class CancelRefundPopupPage {

  data: any;
  cancelRefundLabel: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,private apiProvider:ApiProvider,private toastCtrl:ToastController) {
    this.data = navParams.data;
    console.log(this.data);
    let cancelFee = this.data.cancelResult.policy.cancellationfee == null ? '0.00' : this.data.cancelResult.policy.cancellationfee;
    this.cancelRefundLabel = this.data.cancelResult.policy.refund ? "Do you want to cancel this appointment? \n You will be charged " + this.data.cancelResult.policy.currency + cancelFee + " as cancellation fee.\n Amount to be refund: " + this.data.policy.currency + this.data.policy.refundamount : "Do you want to cancel this appointment?";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelRefundPopupPage');
  }

  /**
   * Dismiss popup
   */
  closePopup() {
    this.viewCtrl.dismiss();
  }

  /**
   * Proceed refund
   */
  async proceed() {
    let companyid: string;
    if (!AppState.IsWemaLife)
      companyid = AppState.UserCred.currentCompanyId;
    else
      companyid =this.data.appointment.companyid;

    var gatewayId =this.data.appointment.serviceaddress != null ? this.data.appointment.serviceaddress['0'].gatewayid : null;

    var request = 
    {
        Action : "Cancel",
        AppointmentId : this.data.appointment.id.split('_')['1'],
        CancelledBy : AppState.UserCred.userid,
        CancelledReason : "User wants to cancel",
        CompanyId :companyid,
        CancelType :this.data.appointment.orderCancellationType,
        ApptSource :this.data.appointment.apptsource,
        GatewayId : gatewayId
    };

    var response = await this.apiProvider.Post(AppConst.ADHOC_BOOKING,request).toPromise();
    if (response != null && response['status']) {
      this.viewCtrl.dismiss({flag:'updateDayAppointments'})
    }
    else{
      this.toastCtrl.create({
        message:'Something went wrong, please try again later!',
        duration:2000
      }).present();
    }
  }

}
