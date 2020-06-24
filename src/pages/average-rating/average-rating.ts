import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ApiProvider } from '../../providers/api/api';
import { AppState } from '../../AppStates';
import { AppConst } from '../../AppConst';
import { ProviderReportFilterPopupPage } from '../provider-report-filter-popup/provider-report-filter-popup';

/**
 * Generated class for the AverageRatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-average-rating',
  templateUrl: 'average-rating.html',
})
export class AverageRatingPage {

  datePeriod: any;
  isReportEmpty: boolean = false;
  rating:any;
  disable_rating: any;
  filter:any;
  ratinghtml:'';
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
    this.getDistanceReports(this.filter);
  }

  /**
   * Get member visit reports
   */
  async getDistanceReports(filter: any) {

    this.datePeriod = this.datePipe.transform(filter.startDate, 'dd-MMM-yyyy') + ' to ' + this.datePipe.transform(filter.endDate, 'dd-MMM-yyyy');

    var request = {
      StartDate: this.datePipe.transform(filter.startDate, 'yyyy-MM-dd'),
      EndDate: this.datePipe.transform(filter.endDate, 'yyyy-MM-dd'),
      Start:filter.start,
      End:filter.end,
      List: 'averagerating',
      UserId: AppState.UserCred.userid,
      CompanyId:AppState.UserCred.currentCompanyId
    };
    
    let response = await this.apiProvider.Post(AppConst.GET_PROVIDER_REPORTS, request).toPromise();
   
    if (response['average'] == 0){
        this.isReportEmpty = true; 
        this.disable_rating = 5;
    }

    if (response != null && response.hasOwnProperty('average')){
      this.rating = response['average'];
      
      this.disable_rating = 5 -  this.rating;
      this.isReportEmpty=this.rating>0? false:true;
    }
    else{
      this.isReportEmpty = false;
      this.disable_rating = 5;
    }



     
  }

  /**
   * Filter reports
   */
  showFilterPopup() {
    let providerReportFilterPopup = this.modalCtrl.create('ProviderReportFilterPopupPage',this.filter);
    providerReportFilterPopup.onDidDismiss((data) => {
      if (data != null)
        this.getDistanceReports(data);
    });
    providerReportFilterPopup.present();
  }

}
