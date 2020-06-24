import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { AppConst } from '../../AppConst';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the ChangeServiceTypePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-service-type',
  templateUrl: 'change-service-type.html',
})
export class ChangeServiceTypePage {
  filteredCompanies: any;
  isServiceVisible = false;
  isCompanyVisible = false;
  serviceKeyword = '';
  companyKeyword = '';
  date: any;
  time: any;
  duration: any;
  selectedCompany: any;
  selectedService: any;
  filteredServices: any;
  services: any;
  companies: any;
  provider: any;
  company: any;
  firstDay: any;
  secondDay: any;
  thirdDay: any;
  slotTimes1: Array<{ date: any, time: string, price: string }>;
  slotTimes2: Array<{ date: any, time: string, price: string }>;
  slotTimes3: Array<{ date: any, time: string, price: string }>;
  constructor( private viewCtrl:ViewController, private apiProvider: ApiProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeServiceTypePage');
    this.getServices();
    this.getCompanies();
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
   * Company item selector
   * @param company
   */
  companySelectedItem(company) {
    this.isCompanyVisible = false;
    this.companyKeyword = company['companyname'];
    this.selectedCompany = company;
  }

  /**
   * Hide the suggestion list
   */
  hideSuggestionList() {
    this.isServiceVisible = false;
    this.isCompanyVisible = false;
  }

  /**
   * Get all services
   */


  async getServices() {
    {
      var request = {
        auth: true,
    
        filterproperty: {
          dir: "DESC",
          offset: 0,
          orderby: "servicename",
          recordlimit: 50
        },
    
      };
      let response = await this.apiProvider.Post(AppConst.GET_SERVICES, request).toPromise(); 

    console.log(response);
    if (response != null && response['records'] != null) {
      this.services = response['records'];
    }
  }
}

  /**
   * Get all the companies
   */
  async getCompanies() {
    var response = await this.apiProvider.Post(AppConst.GET_Random_Company ).toPromise();
    if (response != null) {
      this.companies = response;
    }
  }

  /**
   * company autocomplete
   */
  searchCompany() {
    this.isCompanyVisible = true;
    if (this.companyKeyword != '')
      this.filteredCompanies = this.companies.filter(item => item.companyname.toLowerCase().startsWith(this.companyKeyword.toLowerCase()));
    else
      this.filteredCompanies = this.companies;
  }
  dismissPopup(item,i){
    console.log(item,i)
      this.viewCtrl.dismiss(item);
    }



   
}
