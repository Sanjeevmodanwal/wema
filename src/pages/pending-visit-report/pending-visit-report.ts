import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { DatePipe } from '../../../node_modules/@angular/common';
import { Helper } from '../../helpers/helper';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { VisitReportPopUpPage } from '../visit-report-pop-up/visit-report-pop-up';

/**
 * Generated class for the PendingVisitReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-visit-report',
  templateUrl: 'pending-visit-report.html',
})
export class PendingVisitReportPage {
  pastVisits: any;
  Appointments1: any;
  date: string;
  UpcommingAppointment= [];
  doneAppointment=[];
  Done: number;
  Appointmentdetails: any[];
  upAppointment: number;
  monthHeader: any;
  constructor(private nativeGeocoder: NativeGeocoder,private modalCtrl :ModalController,public navCtrl: NavController,private datePipe: DatePipe ,private apiProvider:ApiProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingVisitReportPage');
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
          element['formattedDate'] = date.getDate() + '-' + month;
          let showdateformat = element['date'];
          element['showdateformat']=showdateformat; 
          element['showstartdatetimeformat']=showdateformat+' '+element['starttime'];
        });
      }

      console.log(this.pastVisits)
  }
  viewVisitReport(report: any) {
    console.log(report); 
    //this.navCtrl.push(VisitReportPopUpPage,{data:report});
    var pastVisitsReportPopUpPage = this.modalCtrl.create('VisitReportPopUpPage', report);
    pastVisitsReportPopUpPage.present();
    pastVisitsReportPopUpPage.onDidDismiss((data) => {
    
    });
    }

}
