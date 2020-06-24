import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProviderDashboardPage } from '../provider-dashboard/provider-dashboard';

/**
 * Generated class for the ProviderCheckinSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider-checkin-success',
  templateUrl: 'provider-checkin-success.html',
})
export class ProviderCheckinSuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderCheckinSuccessPage');
  }

  gotoappointment()
  {
  
    this.navCtrl.setRoot(ProviderDashboardPage)
  }
}
