import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,MenuController  } from 'ionic-angular';
//import { WelcomePage } from "../welcome/welcome";
import { AppState } from '../../AppStates';
import { Geolocation } from '@ionic-native/geolocation';
import { MemberloginPage } from '../memberlogin/memberlogin';

/**
 * Generated class for the SelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selection',
  templateUrl: 'selection.html',
})
export class SelectionPage {

  constructor(public navCtrl: NavController,private menu: MenuController, public navParams: NavParams, private geolocation:Geolocation,private alertCtrl:AlertController) {
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }
  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }

  MemberHandler()
  {
    AppState.IsMember=true;
    this.navCtrl.push('MemberloginPage');
  }

  ProviderHandler()
  {
    AppState.IsMember=false;
    this.navCtrl.push('MemberloginPage');
    // this.navCtrl.push(WelcomePage);
  }

}
