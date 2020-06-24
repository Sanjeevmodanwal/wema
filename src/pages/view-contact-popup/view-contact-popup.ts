import { Component, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ViewContactPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-contact-popup',
  templateUrl: 'view-contact-popup.html',
})
export class ViewContactPopupPage {

  data:any;
  constructor(public navCtrl: NavController,public renderer: Renderer, public navParams: NavParams,private viewCtrl:ViewController) {
    this.data=navParams.data;
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewContactPopupPage');
  }

  /**
   * Dismiss popup
   */
  dismissPopup(){
    this.viewCtrl.dismiss();
  }

}
