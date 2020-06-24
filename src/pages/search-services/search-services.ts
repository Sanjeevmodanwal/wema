import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  ,ViewController, AlertController, ToastController} from 'ionic-angular';
//import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { LoadingController} from "ionic-angular";
import {  NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, App,  Platform,  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { SearchpagePage } from '../searchpage/searchpage';
import { AppState } from '../../AppStates';
/**
 * Generated class for the SearchServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-services',
  templateUrl: 'search-services.html',
})
export class SearchServicesPage {

  services: any;
  filteredServices: any;
  times = ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00",
    "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

  durations = ["1 hour", "2 hours", "3 hours", "4 hours", "5 hours", "6 hours", "7 hours", "8 hours"];
  Location= ["110023","110030","110034","110032"]
  companies: any;
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
 // data: { service: any, duration: string, time: string,endTime:string, company: any, date: string };
  data: { service: any, };
   public lat: any;
  public lng: any;
  SelectedService1="" ;
  services11: any;
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
   
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
  
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation,
     private loadingController: LoadingController, public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private toastCtrl: ToastController, private apiProvider: ApiProvider) {
      console.log(navParams.data)
      this.filteredServices = navParams.data
   
     }
  ionViewDidLoad() {
    var loader = this.loadingController.create({
      content: "Please wait.."
      
    });
    loader.present();

    console.log('ionViewDidLoad serch services ');
    setTimeout(() => {
      loader.dismiss();
    }, 2000);
  }

  ionViewDidEnter() {
    this.getServices();
    this.getCompanies();
    
  }

  dismiss() {
    this.viewCtrl.dismiss(this.data);
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

  /**
   * Submit the search
   */
  Search() {
    console.log(this.lat)
    console.log(this.lng);
    this.calculateDistance( 28.5582876, 51.48032329999999,77.24649070000001,-0.19130250000000615)
   // this.calculateDistance(lat1: 28.5582876,lat2: 51.48032329999999,long1:77.24649070000001,long2:-0.19130250000000615);
  }
  //28.5582876,77.24649070000001

  calculateDistance(lat1: number,lat2: number,long1:number,long2:number){
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    console.log('distance',dis)
    let Mile =dis*0.621371;
console.log(Mile)
    return dis;
  }


  SelectedService(service,i)
  {
    console.log("in servies",service)

    this.SelectedService1=service.servicename
    this.services11=service;

    if(this.services11 !=''){
      AppState.GlobalBookingServiceId = this.services11;
    }
  }
    /*if (this.selectedService != null ) {
      this.data = {
        
        service: this.selectedService,
      //  company: this.selectedCompany,
      // endTime:(parseInt(this.time.split(':')['0'])+1).toString()+':'+this.time.split(':')['1']
      };
      this.viewCtrl.dismiss({ data: this.data, services: this.services,latitude: this.lat ,longitude:this.lng});
   // }
  }
  
  else
      this.alertCtrl.create({
        message: "Please select service to proceed ",
        buttons: ['Ok']
      }).present();
  
  */
 done( )
 {
  this.viewCtrl.dismiss(this.services11);
  
 }
}
