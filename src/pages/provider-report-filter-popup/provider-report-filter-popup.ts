import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ProviderReportFilterPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider-report-filter-popup',
  templateUrl: 'provider-report-filter-popup.html',
})
export class ProviderReportFilterPopupPage {

  startDate: any;
  endDate: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private apiProvider: ApiProvider, private alertCtrl: AlertController) {
    //this.startDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString();
    //this.endDate = new Date().toISOString();

    console.log("=====================navParams.data=============");
    console.log(navParams.data);
    console.log("=====================navParams.data=============");
    let date = new Date(Date.now());
    navParams.data.startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    navParams.data.endDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);


  // console.log(navParams.data.startDate.toISOString());
    this.startDate=new Date(navParams.data.startDate.getTime()+24*60*60*1000).toISOString();
    this.endDate=new Date(navParams.data.endDate.getTime()+24*60*60*1000).toISOString();

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberVisitReportPopupPage');
  }

  /**
   * Submit the filter
   */
  submit() {
    if (this.startDate == null) {
      this.alertCtrl.create({
        message: "Select StartDate"
      }).present;
    }
    else if (this.endDate == null) {
      this.alertCtrl.create({
        message: "Select EndDate"
      }).present();
    }
    else if (new Date(this.startDate).getTime() >= new Date(this.endDate).getTime()) {
      this.alertCtrl.create({
        message: "Start time should be lesser than End time"
      }).present();
    }
    else
      this.viewCtrl.dismiss({  startDate: this.startDate, endDate: this.endDate });
  }
}
