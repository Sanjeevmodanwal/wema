import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { AppConst } from '../../AppConst';
import { ProviderReportFilterPopupPage } from '../provider-report-filter-popup/provider-report-filter-popup';
import { DatePipe } from '@angular/common';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the MoneyearnedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-moneyearned',
  templateUrl: 'moneyearned.html',
})
export class MoneyearnedPage {
  datePeriod: any;
  isReportEmpty: boolean = false;
  moneyEarnedReports:any;
  filter:any;
  totalEarned: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private datePipe:DatePipe,private apiProvider:ApiProvider,private modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoneyearnedPage');
  }
  ionViewDidEnter() {
    let date = new Date(Date.now());
    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let endDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    this.filter = {
      startDate:startDate ,
      endDate: endDate,
      start: new Date(this.datePipe.transform(startDate, 'yyyy-MM-dd')),
      end: endDate
    };
    this.getMoneyEarnedReports(this.filter);
  }

  /**
   * Get member visit reports
   */
  async getMoneyEarnedReports(filter: any) {

    this.datePeriod = 'From ' + this.datePipe.transform(filter.startDate, 'dd MMMM, yyyy') + ' to ' + this.datePipe.transform(filter.endDate, 'dd MMMM, yyyy');

    var request = {
      StartDate: this.datePipe.transform(filter.startDate, 'yyyy-MM-dd'),
      EndDate: this.datePipe.transform(filter.endDate, 'yyyy-MM-dd'),
      Start:filter.start,
      End:filter.end,
      List: 'moneyearned',
      UserId: AppState.UserCred.userid,
      CompanyId:AppState.UserCred.currentCompanyId
    };
    
    let response = await this.apiProvider.Post(AppConst.GET_PROVIDER_REPORTS, request).toPromise();
    if (response != null && response.hasOwnProperty('records') && response['records'].length > 0){
      this.moneyEarnedReports = response['records'];
      this.isReportEmpty=false;
      var loopamount = 0;
      this.moneyEarnedReports.forEach(element => {
          if(element.total != undefined){
            var elementamount =  (element.total >0) ? parseFloat(element.total) : 0 ;
            loopamount += elementamount;
          }
      });

      this.totalEarned = loopamount;
    }
    else
      this.isReportEmpty = true;
  }

  /**
   * Filter reports
   */
  showFilterPopup() {
    let providerReportFilterPopup = this.modalCtrl.create('ProviderReportFilterPopupPage',this.filter);
    providerReportFilterPopup.onDidDismiss((data) => {
      if (data != null)
        this.getMoneyEarnedReports(data);
    });
    providerReportFilterPopup.present();
  }


}
