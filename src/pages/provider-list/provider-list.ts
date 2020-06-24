import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { ProviderInfoPage } from '../provider-info/provider-info';
import { SixPage } from '../six/six';
import { AppState } from '../../AppStates';
import { Helper } from '../../helpers/helper';
/**
 * Generated class for the ProviderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider-list',
  templateUrl: 'provider-list.html',
})
export class ProviderListPage {
  Company_List: any;
  PROVIDERSRECORD=[];
  providersdata=[];
  companyid: any;
  servicesid: any;
  Currency: any;
  searchQuery: string = '';
  items: string[];
  providerpicture: string;

  constructor(public navCtrl: NavController,  private apiProvider:ApiProvider,public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderListPage');
    this.getProviders();
    this.providerpicture= AppConst.WEMA_DEV_ROOT+"images/person.jpg"
    
  }


  initializeItems() {
   // this.providersdata
    // this.items = [
    
  }

  ionViewDidEnter() {
    
  //  this.getProviders();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.providersdata = this.providersdata.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async getProviders()
{

  this.PROVIDERSRECORD=[];
  var countryid = '';
  if(AppState.UserCred!=undefined){
  if(AppState.UserCred.formvalues.hasOwnProperty('country') ){
      if(AppState.UserCred.formvalues['country'] == '1' || AppState.UserCred.formvalues['country'] == '2'){
        countryid = AppState.UserCred.formvalues['country'];
      }
    }
  }

  var request = {
    auth: true,
    countryid :countryid,
 //set":0,"recordlimit":5,"orderby":"categoryorder","dir":"DESC"},auth:true}
    filterproperty: {
      dir: "DESC",
      offset: 0,
      orderby: "categoryorder",
      recordlimit: 5
    },

  };
  let response = await this.apiProvider.Post(AppConst.GET_COMPANY_LIST, request).toPromise();
//console.log(response)
this.Company_List=response;
//console.log(this.Company_List.type['provider'])
for(let key in this.Company_List)
{
 //console.log(this.Company_List[key].type) 
 if(this.Company_List[key].type=='provider')
 {
  if(countryid == ''){

    if(this.Company_List[key].hasOwnProperty('details') ){
      var providerdetials = this.Company_List[key].details;
      if(providerdetials.hasOwnProperty('providerdetails') ){
        var Innerproviderdetails = providerdetials.providerdetails;
        if(Innerproviderdetails.hasOwnProperty('country') ){
          var Inneramount = providerdetials.amount;
        
          if(Innerproviderdetails.country != '' && parseInt(Inneramount) > 0){
            this.Company_List[key]['SetCurrency']  = Helper.getCountryCurrencySymbol(Innerproviderdetails.country);

            console.log('=============iiiififffff SetCurrency=='+Helper.getCountryCurrencySymbol(Innerproviderdetails.country)+'===========');
            this.PROVIDERSRECORD.push(this.Company_List[key]);
          }
          
        }
      }
    }


   
  }else{

    if(this.Company_List[key].hasOwnProperty('details') ){
      var providerdetials = this.Company_List[key].details;
      if(providerdetials.hasOwnProperty('providerdetails') ){
        var Innerproviderdetails = providerdetials.providerdetails;
        if(Innerproviderdetails.hasOwnProperty('country') ){
          var Inneramount = providerdetials.amount;
          if(Innerproviderdetails.country == countryid && parseInt(Inneramount) > 0){
            this.Company_List[key]['SetCurrency']  = Helper.getCountryCurrencySymbol(Innerproviderdetails.country);
            this.PROVIDERSRECORD.push(this.Company_List[key]);

          }
        }
      }
    }
  }
 }
 
 // console.log(this.Company_List[key])
  //console.log(response['records'])
//this.ServicesLogo=response['records']
}
this.PROVIDERSRECORD =  this.PROVIDERSRECORD.sort(function (a, b) {
  return b.companyid - a.companyid;
});
//console.log(this.PROVIDERSRECORD)
var counterprovider = 0;
  this.providersdata=[];
for(let i in this.PROVIDERSRECORD)
{
  //console.log(this.PROVIDERSRECORD[i])
  //console.log(this.PROVIDERSRECORD[i].details)
 
  
  if(counterprovider < 10){

    console.log("-------------------counterprovider = "+counterprovider+"-----------------------------");
  
    this.PROVIDERSRECORD[i]['details']['companyid']  = this.PROVIDERSRECORD[i].providercompanyid;
    this.PROVIDERSRECORD[i]['details']['serviceid']  = this.PROVIDERSRECORD[i].serviceid;
    this.PROVIDERSRECORD[i]['details']['servicesoffered']  = this.PROVIDERSRECORD[i].servicesoffered;
    this.PROVIDERSRECORD[i]['details']['SetCurrency']  = this.PROVIDERSRECORD[i].SetCurrency;
    this.providersdata.push(this.PROVIDERSRECORD[i].details);
      counterprovider++;
}
//  console.log(this.providersdata)
  /* {
   for(let pro in this.PROVIDERSRECORD[i].details)
    {
      console.log(this.PROVIDERSRECORD[i].details[pro])
      this.providersdata.push(this.PROVIDERSRECORD[i].details[pro])

    }
  }*/
 // this.initializeItems();
}

//console.log(this.providersdata)

console.log("length="+this.providersdata.length)
}


page_info(item,i)
{
//  console.log(i)
//  console.log(item)
 // this.companyid['companyid']=item
 // item['companyid']=this.companyid
  //item['servicesid']=this.servicesid
 item['Currency']=this.Currency
  this.navCtrl.push('ProviderInfoPage',item)
}
}
