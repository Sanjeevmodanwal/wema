import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { Injectable,ElementRef } from '@angular/core';
/**
 * Generated class for the PopularityPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popularity-popup',
  templateUrl: 'popularity-popup.html',
})
export class PopularityPopupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PopularityPopupPage');
  }

}
