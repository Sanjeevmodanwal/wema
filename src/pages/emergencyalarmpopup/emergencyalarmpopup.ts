import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EmergencyalarmpopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emergencyalarmpopup',
  templateUrl: 'emergencyalarmpopup.html',
})
export class EmergencyalarmpopupPage {
  reason: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyalarmpopupPage');
  }

  ionViewWillLoad() {
   
  }
  dismiss(flag: string) {
    if (flag == 'cancel')
    this.viewCtrl.dismiss();
  else {
    if (this.reason != '')
      this.viewCtrl.dismiss(this.reason);
  }
  
  }
}
