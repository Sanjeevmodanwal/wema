import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ApiProvider } from '../../providers/api/api';
import { MemberVisitReportPopupPage } from '../member-visit-report-popup/member-visit-report-popup';
import { AppState } from '../../AppStates';
import { AppConst } from '../../AppConst';
import { ProviderReportFilterPopupPage } from '../provider-report-filter-popup/provider-report-filter-popup';

/**
 * Generated class for the MemberServicedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-serviced',
  templateUrl: 'member-serviced.html',
})
export class MemberServicedPage {

  datePeriod: any;
  isReportEmpty: boolean = false;
  memberServicedReports:any;
  filter:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private datePipe:DatePipe,private apiProvider:ApiProvider,private modalCtrl:ModalController) {
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
    this.getMemberServicedReports(this.filter);
  }

  /**
   * Get member visit reports
   */
  async getMemberServicedReports(filter: any) {

    this.datePeriod = this.datePipe.transform(filter.startDate, 'dd-MMM-yyyy') + ' to ' + this.datePipe.transform(filter.endDate, 'dd-MMM-yyyy');

    var request = {
      StartDate: this.datePipe.transform(filter.startDate, 'yyyy-MM-dd'),
      EndDate: this.datePipe.transform(filter.endDate, 'yyyy-MM-dd'),
      Start:filter.start,
      End:filter.end,
      List: 'visits',
      UserId: AppState.UserCred.userid,
      CompanyId:AppState.UserCred.currentCompanyId,
      Status:'Completed'
    };
    
    let response = await this.apiProvider.Post(AppConst.GET_PROVIDER_REPORTS, request).toPromise();

    if (response['records'] == 0){
      this.isReportEmpty=true;
    }
    if (response != null && response.hasOwnProperty('records') && response['records'].length > 0){
      this.memberServicedReports = response['records'];
      this.isReportEmpty=false;
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
        this.getMemberServicedReports(data);
    });
    providerReportFilterPopup.present();
  }
}
