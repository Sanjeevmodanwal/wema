import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { AppState } from '../../AppStates';
import { ReviewPage } from '../review/review';
import { AddnewaddressPage } from '../addnewaddress/addnewaddress';

/**
 * Generated class for the SelectDeliveryLocPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-delivery-loc',
  templateUrl: 'select-delivery-loc.html',
})
export class SelectDeliveryLocPage {
  DeliveryData: any;
  selectedaddress: any;
  CompanyId: any;
  compnayInfo = [];
  companylatitude : string='';
  companylongitude : string='';
  deliverToThisAddress:boolean =true;
  loader: any;

  constructor(public navCtrl: NavController,private toastCtrl: ToastController, private alertCtrl :AlertController, public navParams: NavParams,public apiProvider:ApiProvider) {
  console.log("GlobalBookingCompanyId ="+AppState.GlobalBookingCompanyId);
    if(AppState.GlobalBookingCompanyId !=null) {
      this.CompanyId = AppState.GlobalBookingCompanyId;
      this.getCompnayInfo();
    }else{
        this.deliverToThisAddress =  false;
        this.toastCtrl.create({
          message: 'Sorry something went wrong',
          duration: 3000
        }).present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectDeliveryLocPage');
    this.getServices();
   
  }

  async getCompnayInfo(){

    if(this.CompanyId !=''){
      var request =
        {
          filterproperty: { offset: 0, recordlimit: 500, orderby: "servicename", dir: "DESC" },
          companyid:this.CompanyId,
        };
       var response = await this.apiProvider.Post(AppConst.GET_COMPANYPROFILE, request).toPromise();
       if(response != null && response != '')
        {
          for(let key in response)
          {
            this.compnayInfo = response[key]['compinfo'];
            this.companylatitude = this.compnayInfo['latitude'];
            this.companylongitude = this.compnayInfo['longitude'];
          }
        }
        
        console.log("==============compnayInfo==============");
        console.log(this.compnayInfo);
        console.log("==============compnayInfo==============");
      }
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad ionViewDidEnter');
    this.getServices();
  }
  async getServices()
{

  var filters = [{fieldname: "country", fieldvalue:'', operators: "Equal"},
 {fieldname: "status", fieldvalue: "1", operators: "Equal"},
 {fieldname: "addressuserid", fieldvalue:  AppState.UserCred['userid'], operators: "Equal"}
  ]
  var request = {
   
filter:filters,
    filterproperty: {dir: "ASC",
    offset: 0,
    recordlimit: 0},
  };
  let response = await this.apiProvider.Post(AppConst.GetAddressData,request).toPromise();
console.log(response)
this.DeliveryData=response['records']
}
selectLocation(del)
{
console.log(del)
this.selectedaddress=del.addressid

}
getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  var distance = parseInt( d.toFixed(1) );
  return distance;
}
deg2rad(deg:any) {
  return deg * (Math.PI/180)
}

itemReview(item:any)
{

  if(item.latitude !='' && item.longitude !='' && this.companylatitude!='' && this.companylongitude !=''){
   

    var distance = this.getDistanceFromLatLonInKm(item.latitude,item.longitude,this.companylatitude,this.companylongitude);
    //alert(distance);
    if (distance <= 81) {  
        console.log(item)
        this.selectedaddress=item.addressid
        this.navCtrl.push('ReviewPage',item)
    }else{
      this.toastCtrl.create({
        message: 'Sorry! Service is not available in your location',
        duration: 3000
      }).present();
    }

  }else{
      this.toastCtrl.create({
        message: 'Sorry! Service is not available in your location',
        duration: 3000
      }).present();
  }
}

onChange(del)
{

  this.selectedaddress=del.addressid
}
AddAddress()
{
this.navCtrl.push('AddnewaddressPage')
console.log("add address ")
}
EditAddress(del)
{

  this.navCtrl.push('AddnewaddressPage',del)
  
}


/**
   * delete member 
   * @param item 
   */
  async DeleteAddress(userdata: any) {
    console.log(userdata);
    this.alertCtrl.create({
      message: "Do you want to delete?",
      buttons: [
        'No',
        {
          text: "Yes",
          handler: () => {
            var request = {
              addressid: userdata.addressid,
              userid: AppState.UserCred.userid
            };
            this.apiProvider.Post(AppConst.DELETE_ADDRESS_BOOK, request).subscribe((response) => {
              if (response != null && response['status']) {
                this.toastCtrl.create({
                  message:'Address has been deleted.',
                  duration:2000
                }).present();
                this.getServices();
              } 
              else {
                this.toastCtrl.create({
                  message: 'Something went wrong',
                  duration: 2000
                }).present();
              }
            });
          }
        }
      ]
    }).present();
  }

}