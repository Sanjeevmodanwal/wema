import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';

/**
 * Generated class for the PaymentReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-receipt',
  templateUrl: 'payment-receipt.html',
})
export class PaymentReceiptPage {

  receipt: any;
  serviceDescription: string;
  orderId: string;
  companyData: any;
  totalPrice: number;
  totalWithCurrency: string;
  companyId: string;
  hasBackButton: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider) {
    this.orderId = navParams.get('orderId');
    this.hasBackButton = navParams.get('hasBackButton');

    if (this.hasBackButton)
      this.companyId = navParams.get('companyId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentReceiptPage');
  }

  ionViewDidEnter() {
    this.getReceipt();
  }

  /**
   * Get receipt of the order
   */
  async getReceipt() {
    let request = {
      orderid: this.orderId
    }

    if (!AppState.IsWemaLife)
      request['companyid'] = AppState.UserCred.currentCompanyId;
    else {
      if (this.hasBackButton)
        request['companyid'] = this.companyId;
      else
        request['companyid'] = AppState.UserCred.wemaCurrentCompanyId;
    }

    let response = await this.apiProvider.Post(AppConst.ADHOC_BOOKING, request).toPromise();
    if (response != null && response.hasOwnProperty('records') && response['records'] != null) {
      this.companyData = !AppState.IsWemaLife ? AppState.CurrentCompany : response['records']['company'];
      this.receipt = response['records'];
      this.serviceDescription = this.receipt['planduration'] + '\n' + this.receipt['planname'] + ' - ' + this.receipt['plandurations'];

      let i = 0;
      this.receipt['services'].forEach(service => {
        service['currency'] = this.receipt['currency'];
        if (i == this.receipt['services'].length - 1)
          this.serviceDescription = this.serviceDescription + service['servicename'] + ' - ' + service['hours'] + '\n';
        else {
          this.serviceDescription = this.serviceDescription + service['servicename'] + ' - ' + service['hours'] + ',' + '\n';
          i += 1;
        }
      });

      if (this.receipt['services'] != null && this.receipt['services'].length > 0)
        this.totalWithCurrency = this.receipt['currency'] + this.receipt['total'];
    }
  }

}
