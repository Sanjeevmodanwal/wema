import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, ToastController} from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { DatePipe } from '@angular/common';
/**
 * Generated class for the ReportdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reportdetails',
  templateUrl: 'reportdetails.html',
})
export class ReportdetailsPage {
  data: any;
  public appState =AppState;
  IsMember = true;
  PastVisitsReport: any;
  rating:any
  Comments_about_services :any;
  Activity_Notes :any;
  Comment_about_member :any;
  membername :any;
  servicename :any;
  dateTime :any;
  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private apiProvider: ApiProvider, public navParams: NavParams, private viewCtrl: ViewController, modalCtrl: ModalController,private datePipe:DatePipe) {
    this.data = navParams.data;

    console.log("========report details page=========");
    console.log(this.data); 
    console.log("========report details page=========");

    if(this.data.providerreport){
      this.Comments_about_services = this.data.providerreport;
    }
    if(this.data.activities){
      this.Activity_Notes = this.data.activities;
    }
    if(this.data.comments){
      this.Comment_about_member = this.data.comments;
    }
    if(this.data.rating){
      this.rating = this.data.rating;
    }
    if(this.data.membername){
      this.membername = this.data.membername;
    }
    if(this.data.servicename){
      this.servicename = this.data.servicename;
    }

    if(this.data.date){
      let dateArray = this.data.date.split("-");
      let dtatime = dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0];
      let starttimeArray = this.data.starttime.split(":");
      this.dateTime = this.datePipe.transform(dtatime, 'dd MMMM yyyy')  + " "+ starttimeArray[0]+":"+starttimeArray[1];
    }
  } 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportdetailsPage');
  }

}
