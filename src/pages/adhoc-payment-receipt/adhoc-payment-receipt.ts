import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { Observable } from 'rxjs/Observable';
import { HomePage } from '../home/home';

/**
 * Generated class for the AppointmentConfirmedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adhoc-payment-receipt',
  templateUrl: 'adhoc-payment-receipt.html',
})
export class AdhocPaymentReceiptPage {

  data: any;
  services: any;
  orderid: any;
  totalPrice: string;
  date: any;
  paymentMode: string;
  companyId: string;
  companyData:any;
  //receipt:{id:any,paymentstartdatereceipt:any,transactionId:any,currency:string}={id:'',paymentstartdatereceipt:'',transactionId:'',currency:''};
  receipt:Observable<any>;
  title: string;
  hasBackButton: boolean;
  isShowCompany:boolean;
  isPayLater:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider) {
    this.data = navParams.data;
    this.hasBackButton = this.data.hasBackButton;
    //console.log(this.hasBackButton);
    this.date = new Date().toISOString();
    this.paymentMode = this.data.paylater ? "Post-Payment" : "Online";
    this.isPayLater=this.data.paylater;
    this.isShowCompany=!AppState.IsWemaLife;
    if (this.hasBackButton) {
      this.title = 'Payment Receipt';
      this.companyId = this.data.companyId;
    }
    else
      this.title = 'Appointment Confirmed';
  }

  ionViewDidEnter() {
    this.getReceipt();
  }

  /**
   * Get booked adhoc services receipt 
   */
  async getReceipt() {
    var request = {
      orderid: this.data.orderid
    };

    if (!AppState.IsWemaLife)
      request['companyid'] = AppState.UserCred.currentCompanyId;
    else {
      if (this.hasBackButton)
        request['companyid'] = this.companyId;
      else
        request['companyid'] = AppState.UserCred.wemaCurrentCompanyId;
    }

    var response = await this.apiProvider.Post(AppConst.GET_ADHOC_ORDER_RECEIPT, request).toPromise();
    if (response != null && response['records'] != null) {
      this.companyData=AppState.CurrentCompany;
      //console.log(this.companyData)
      this.receipt=response['records'];
      this.orderid = response['records']['id'];
      this.services = response['records']['services'];
      this.services.forEach(service => {
      service.currency=this.receipt['currency'];
      });
      this.totalPrice = response['records']['currency'] + response['records']['total'];
    }
  }


  homePage()
  {
    this.navCtrl.setRoot(HomePage)
  }
}
