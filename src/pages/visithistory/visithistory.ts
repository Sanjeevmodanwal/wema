import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { AppState } from '../../AppStates';
import { VisitReportPopUpPage } from '../visit-report-pop-up/visit-report-pop-up';
import { VisitCommentPopUpPage } from '../visit-comment-pop-up/visit-comment-pop-up';
import { Helper } from '../../helpers/helper';
/**
 * Generated class for the VisithistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visithistory',
  templateUrl: 'visithistory.html',
})
export class VisithistoryPage {
  pastVisits: any;
  TodayDate: string;
  items: any;
  public appState = AppState;
  fullMonth: string;
  CatDate: any;
  Doubledata=[];
  changedateData: number;
  newchangedate: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private datePipe: DatePipe, private apiProvider: ApiProvider, private modalCtrl: ModalController) {
  }

  ionViewDidEnter() {
    let date = new Date(Date.now());
    let TodayDate = new Date(date.getMonth());

    var filter = {
      TodayDate: TodayDate,

      Today: new Date(this.datePipe.transform(TodayDate, 'yyyy-MM-dd')),

    };
    this.getPastVisits(filter);
  }

  

  async getPastVisits(filter: any) {
    var request = {
      //companyid: AppState.UserCred.currentCompanyId
    };
    if (AppState.IsMember)
      request['memberid'] = AppState.UserCred.userid;
    else
      request['providerid'] = AppState.UserCred.userid;
    console.log(request);
    let response = await this.apiProvider.Post(AppConst.GET_PAST_VISITS, request).toPromise();
      if (response != null && response.hasOwnProperty('records') && response['records'].length > 0) {
        this.pastVisits = response['records'];
        this.pastVisits.forEach(element => {
          var date = new Date(element['starttime']);
          var month = Helper.getShortMonth(date.getMonth());
        this.fullMonth= Helper.getFullMonth(10)
          element['formattedDate'] = date.getDay() + ' ' + month;
          element['datenew'] = element['starttime']; 
          element['formattedDatetime'] = Helper.getFormatedTime(date);

          let showdateformat = element['date'];
          element['showdateformat']=showdateformat; 
          element['showstartdatetimeformat']=showdateformat+' '+element['starttime'];

          
        });
      }
      console.log(this.pastVisits)
//    this.Doubledata.push(this.pastVisits['0']) 
//    this.Doubledata.push(this.pastVisits['0']) 
//  this.changedateData=this.pastVisits['0']
//    //this.changedateData['date']='2018-12-05'
//console.log(this.changedateData)
//this.newchangedate=this.changedateData
//this.newchangedate['date1']='2018-12-05'
//console.log(this.newchangedate)
//this.Doubledata.push(this.newchangedate)
 //  this.Doubledata.push(this.pastVisits['0'])
  // this.Doubledata['2'].date='12-4-2018'
  // console.log(this.Doubledata)
   for(let i in this.pastVisits)
   {
     console.log(this.pastVisits[i])
     this.pastVisits[i]['city']='delhi'
   }
  // this.Doubledata['1'].date1='2018-12-09'
  // console.log(this.Doubledata)
  // console.log(this.Doubledata['2'].date='2018-12-09')
 // this.pastVisits['1'].push(this.pastVisits['0'])
      console.log(this.pastVisits)
      this.CatDate=this.pastVisits['0'].date
  }
  viewVisitReport(report: any) {
    console.log(report); 
    //this.navCtrl.push(VisitReportPopUpPage,{data:report});
    var pastVisitsReportPopUpPage = this.modalCtrl.create('VisitReportPopUpPage', report);
    pastVisitsReportPopUpPage.present();
    pastVisitsReportPopUpPage.onDidDismiss((data) => {
    
    });
    }

  /**
   * Show commment popup
   * @param report 
   */
  comment(report: any) {
    console.log(report);
    var PastCommentPopUpPageModal = this.modalCtrl.create('VisitCommentPopUpPage', report);
    PastCommentPopUpPageModal.present();
    PastCommentPopUpPageModal.onDidDismiss((data) => {
    });
  }

}
