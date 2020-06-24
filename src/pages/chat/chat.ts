import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
//import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { AppConst } from '../../AppConst';
import { AppState } from '../../AppStates';
import { DomSanitizer } from "@angular/platform-browser";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  url: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser, private toastCtrl: ToastController, public sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    //let target = "_system";
    let target = "_blank";
    //let target = "_self"; 
    this.url = AppConst.GetWemaBaseAddress() + '/cometchat/cometchat_embedded.php?basedata=' + AppState.UserCred.userid + '&companyid=' + AppState.UserCred.currentCompany.companyid;
    //var web=this.inAppBrowser.create(this.url,target,'location=no');

    /*this.browserTab.isAvailable()
      .then((isAvailable: boolean) => {

        if (isAvailable) {

          this.browserTab.openUrl('https://www.techiediaries.com');

        } else {

          // if custom tabs are not available you may  use InAppBrowser

        }

      });*/

    let iframe = <HTMLIFrameElement>document.getElementById('ifr');
    console.log(JSON.stringify(iframe.contentWindow.location));
    this.onLoad()
  }

  onLoad() {
    let iframe = <HTMLIFrameElement>document.getElementById('ifr');
    console.log(iframe.contentWindow.location);
  }

}
