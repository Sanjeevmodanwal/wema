import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
//import { MemberVisitReportPopupPage } from '../member-visit-report-popup/member-visit-report-popup';
import { ProviderReportFilterPopupPage } from '../provider-report-filter-popup/provider-report-filter-popup';
import { VisitReportPopUpPage } from '../visit-report-pop-up/visit-report-pop-up';
import { ReportdetailsPage } from '../reportdetails/reportdetails';
/**
 * Generated class for the ProviderVisitReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider-visit-report',
  templateUrl: 'provider-visit-report.html',
})
export class ProviderVisitReportPage {

  datePeriod: any;
  isVisitEmpty: boolean = false;
  visitReports:any;
  filter:any;
  startDate:any;
  endDate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private datePipe:DatePipe,private apiProvider:ApiProvider,private modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderVisitReportPage');
    let date = new Date(Date.now());
    this.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    this.endDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    this.filter = {
      startDate: this.startDate ,
      endDate:  this.endDate,
      start: new Date(this.datePipe.transform( this.startDate, 'yyyy-MM-dd')),
      end:  this.endDate
    };
  }

  ionViewDidEnter() {
    
    this.getProviderVisitReports(this.filter);
  }

  /**
   * Get member visit reports
   */
  async getProviderVisitReports(filter: any) {

    this.datePeriod = this.datePipe.transform(filter.startDate, 'dd-MMM-yyyy') + ' to ' + this.datePipe.transform(filter.endDate, 'dd-MMM-yyyy');
    this.startDate =  filter.startDat;
    this.endDate = filter.endDate;
    this.filter = filter;
    var request = {
      StartDate: this.datePipe.transform(filter.startDate, 'yyyy-MM-dd'),
      EndDate: this.datePipe.transform(filter.endDate, 'yyyy-MM-dd'),
      Start:filter.start,
      End:filter.end, 
      List: 'visits',
      UserId: AppState.UserCred.userid,
      CompanyId:AppState.UserCred.currentCompanyId
    };
    
    let response = await this.apiProvider.Post(AppConst.GET_PROVIDER_REPORTS, request).toPromise();

    if (response != null && response.hasOwnProperty('records') && response['records'].length > 0){
      this.visitReports = response['records'];
      this.visitReports.forEach(element => {
        element['statusMode']=element['status']=='5'?'Completed':'Cancelled';
        let showdateformat = element['date'];
        if(element['date'] !=''){
          let splitedate = element['date'].split('-');
          showdateformat = splitedate[2] + '-' + splitedate[1] + '-' + splitedate[0];
        }
        element['showdateformat']=showdateformat; 
        element['showstartdatetimeformat']=showdateformat+' '+element['starttime'];
      });
      this.isVisitEmpty=false;
    } 
    else{
      this.isVisitEmpty = true;
      this.visitReports =[];
    }
  }

  /**
   * Filter reports
   */
  showFilterPopup() {
    let providerReportFilterPopup = this.modalCtrl.create('ProviderReportFilterPopupPage',this.filter);
    providerReportFilterPopup.onDidDismiss((data) => {
      if (data != null)
        this.getProviderVisitReports(data);
    });
    providerReportFilterPopup.present();
  }

  /**
   * View visit report
   * @param report 
   */
  viewVisitReport(report: any) {
    console.log(report);
    this.navCtrl.push('ReportdetailsPage',report);
    
  }
}
