import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LocationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location-list',
  templateUrl: 'location-list.html',
})
export class LocationListPage {
 
  LocationInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
 console.log(navParams.data)
 this.LocationInfo=navParams.data
 console.log(this.LocationInfo)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationListPage');
  }

}
