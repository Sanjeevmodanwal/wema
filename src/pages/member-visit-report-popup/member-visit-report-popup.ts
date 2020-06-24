import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';

/**
 * Generated class for the MemberVisitReportPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-member-visit-report-popup',
  templateUrl: 'member-visit-report-popup.html',
})
export class MemberVisitReportPopupPage {

  services: any;
  filteredServices: any;
  isServiceVisible: boolean;
  selectedService: any;
  serviceKeyword = '';
  startDate: any;
  endDate: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private apiProvider: ApiProvider,private alertCtrl:AlertController) {
    this.startDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString();
    this.endDate = new Date().toISOString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberVisitReportPopupPage');
  }

  ionViewDidEnter() {
    this.getServices();
  }

  /**
   * Get all services
   */
  async getServices() {
    var filterproperty =
      {
        offset: 0,
        orderby: "servicename",
        recordlimit: 0
      };
    var filter =
      {
        fieldname: "companyid",
        fieldvalue: AppState.UserCred['currentCompanyid'],
        operators: "Equal"
      };
    var filterRequest =
      {
        filterproperty: filterproperty,
        filter: [filter],
        MemberId: AppState.UserCred['userid']
      };

    var response = await this.apiProvider.Post(AppConst.GET_SERVICES, filterRequest).toPromise();
    console.log(response);
    if (response != null && response['records'] != null) {
      this.services = response['records'];
    }
  }

  /**
   * Care services autocomplete
   */
  searchService() {
    this.isServiceVisible = true;
    if (this.serviceKeyword != '')
      this.filteredServices = this.services.filter(item => item.servicename.toLowerCase().startsWith(this.serviceKeyword.toLowerCase()));
    else
      this.filteredServices = this.services;
  }

  /**
   * Care services item selector
   * @param service 
   */
  serviceSelectedItem(service) {
    this.isServiceVisible = false;
    this.serviceKeyword = service['servicename'];
    this.selectedService = service;
  }

  /**
   * Submit the filter
   */
  submit() {
    if (this.selectedService==null){
      this.alertCtrl.create({
        message:"Select any Service"
      }).present();
    }
    else if (this.startDate==null) {
      this.alertCtrl.create({
        message:"Select StartDate"
      }).present;
    }
    else if (this.endDate== null) {
      this.alertCtrl.create({
        message:"Select EndDate"
      }).present();
    }
    else if (new Date(this.startDate).getTime()>=new Date(this.endDate).getTime()) {
      this.alertCtrl.create({
        message:"Start time should be lesser than End time"
      }).present();
    }
    else
      this.viewCtrl.dismiss({ serviceId: this.selectedService.serviceid, startDate: this.startDate, endDate: this.endDate });
  }

}
