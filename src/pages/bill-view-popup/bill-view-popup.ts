import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BillViewPopUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill-view-pop-up',
  templateUrl: 'bill-view-popup.html',
})
export class BillViewPopupPage {
  url:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.url=navParams.get('url');
  }

}
