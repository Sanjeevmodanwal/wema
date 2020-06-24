import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { AddFriendsAndFamilyPage } from '../add-friends-and-family/add-friends-and-family';
import { ExistFriendsAndFamilyPage } from '../exist-friends-and-family/exist-friends-and-family';
import { AdhocCheckoutPage } from '../adhoc-checkout/adhoc-checkout';
import { AppState } from '../../AppStates';
import { AddFriendsFamilyPage } from '../add-friends-family/add-friends-family';
/**
 * Generated class for the AddFriendsMemberAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-friends-member-account',
  templateUrl: 'add-friends-member-account.html',
})
export class AddFriendsMemberAccountPage {
  bottomPad='10px';
  registerType: any = '0';
  public appState = AppState;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bottomPad=navParams.get('isDashboard')!=null?'60px':'10px'
  }

/**
   * Cart click handler
   */
  viewCart() {
    this.navCtrl.push('AdhocCheckoutPage');
  }

  /**
   * Goto next page
   */
  next() {
    if (this.registerType == '0')
      //this.navCtrl.push(AddFriendsAndFamilyPage,this.navParams);
      this.navCtrl.push('AddFriendsFamilyPage',this.navParams);
    else
      this.navCtrl.push('ExistFriendsAndFamilyPage',this.navParams);
  }
}
