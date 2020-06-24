import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from "../../AppConst";
import { AppState } from '../../AppStates';

/**
 * Generated class for the AddcompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcompany',
  templateUrl: 'addcompany.html',
})
export class AddcompanyPage {

  public appState = AppState;
  CompanyDetail = { CompanyNumber: '', CompanyName: '', UniqueNumber: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider, private toastController: ToastController, private events: Events) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddcompanyPage');
  }

  /**
   * Focus out of Company Number
   */
  async onFocusOut() {
    var value = this.CompanyDetail.CompanyNumber;
    if (value == null || value == '') {
      this.toastController.create({
        message: "Please enter company number",
        duration: 2000
      }).present();
    }
    else {
      var request = {
        Action: "search",
        CompanyNo: value,
        auth: false
      };
      var response = await this.apiProvider.Post(AppConst.SEARCH_COMPANIES, request).toPromise();
      if (response != null && response['status'] == true) {
        this.CompanyDetail.CompanyName = response['records']['companyname'];
      }
      else {
        this.toastController.create({
          message: "Wrong company number",
          duration: 2000
        }).present();
      }
    }
  }

  /**
   * Add company
   */
  async addCompany() {
    if (this.CompanyDetail.CompanyNumber != '' && this.CompanyDetail.UniqueNumber != null) {
      var request = {
        userid: AppState.UserCred['userid'],
        companyno: this.CompanyDetail.CompanyNumber,
        uniquenumber: this.CompanyDetail.UniqueNumber
      };

      var response = await this.apiProvider.Post(AppConst.ADD_COMPANY, request).toPromise();
      if (response != null && response['status'] == true) {
        this.CompanyDetail.CompanyNumber = '';
        this.CompanyDetail.CompanyName = '';
        this.CompanyDetail.UniqueNumber = '';
        this.toastController.create({
          message: "Company added successfully",
          duration: 2000
        }).present();
      }
      else {
        this.CompanyDetail.CompanyNumber = '';
        this.CompanyDetail.CompanyName = '';
        this.CompanyDetail.UniqueNumber = '';
        this.toastController.create({
          message: response['message'],
          duration: 2000
        }).present();
      }

    }
  }

  /**
   * Reset all fields
   */
  reset() {
    this.CompanyDetail.CompanyNumber = '';
    this.CompanyDetail.CompanyName = '';
    this.CompanyDetail.UniqueNumber = '';
  }
}
