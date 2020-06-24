import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ Storage } from '@ionic/storage'
import { ProviderInfoPage } from '../provider-info/provider-info';
/**
 * Generated class for the ProvidersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-providers',
  templateUrl: 'providers.html',
})
export class ProvidersPage {
  data: any;
  click: boolean=false;
  companyname: any;
  loction: any;
  companyid: any;
  providerid: any;
  servicesid: any;
  Currency: any;
  DataArray= [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage :Storage) {
    console.log(navParams.data)
    this.data=navParams.data
    this.companyname=navParams.data.companyname
    this.loction=navParams.data.location

    this.companyid=navParams.data.companyid
    this.servicesid=navParams.data.servicesid
    this.Currency=navParams.data.Currency
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvidersPage');
  }
  filter()
  {
   this.click=true

  }
  filter1()
  {
    
this.click=false
  }

  page_info (item,i)
  {
    console.log(i)
    console.log(item)
  // this.companyid['companyid']=item
    item['companyid']=this.companyid
    item['servicesid']=this.servicesid
    item['Currency']=this.Currency
    this.DataArray.push(item)
    this.storage.set('viewedList', JSON.stringify(this.DataArray));
    this.navCtrl.push('ProviderInfoPage',item)
  }
}
