import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HouseholdPage } from '../household/household';
import { MapPage } from '../map/map';
import { PopularityPage } from '../popularity/popularity';
import { ListPage } from '../list/list';
import { GetDirectionPage } from '../get-direction/get-direction';
import { LocationsPage } from '../locations/locations';
import { ProviderLocationPage } from '../provider-location/provider-location';
import { LocationListPage } from '../location-list/location-list';

/**
 * Generated class for the ProvidersLocationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-providers-location-list',
  templateUrl: 'providers-location-list.html',
})
export class ProvidersLocationListPage {
  tab1Root = 'LocationListPage';
  tab2Root = 'ProviderLocationPage';
  Tab1Data:any
  LocationInfo: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
console.log(navParams.data)
this.Tab1Data=navParams.data
 this.LocationInfo=this.Tab1Data
 console.log(this.LocationInfo)
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvidersLocationListPage');
  }

}
