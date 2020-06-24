import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ServicesInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services-info',
  templateUrl: 'services-info.html',
})
export class ServicesInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesInfoPage');
  }
  items = [
    {name:'one', active:false},
   
  ];
  toggleClass(item){
    item.active = !item.active;
  }
}
