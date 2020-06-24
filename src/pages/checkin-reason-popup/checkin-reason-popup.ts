import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CheckinReasonPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkin-reason-popup',
  templateUrl: 'checkin-reason-popup.html',
})
export class CheckinReasonPopupPage {

  title: string;
  reason: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.title = navParams.data.title;
  }

  /**
   * Dismiss the popup
   */
  dismiss(flag: string) {
    if (flag == 'cancel')
      this.viewCtrl.dismiss();
    else {
      if (this.reason != '')
        this.viewCtrl.dismiss(this.reason);
    }
  }

}
