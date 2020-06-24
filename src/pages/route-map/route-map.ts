import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent,InAppBrowserOptions } from '@ionic-native/in-app-browser';
/**
 * Generated class for the RouteMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route-map',
  templateUrl: 'route-map.html',
})
export class RouteMapPage {
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only 
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'no', //iOS only 
    toolbar: 'yes', //iOS only 
    enableViewportScale: 'no', //iOS only 
    allowInlineMediaPlayback: 'no',//iOS only 
    presentationstyle: 'pagesheet',//iOS only 
    fullscreen: 'yes',//Windows only    
  };
  constructor(public navCtrl: NavController,  private inAppBrowser: InAppBrowser,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RouteMapPage');
    var web=this.inAppBrowser.create('https://www.google.com/maps/search/?api=1&query=28.9800205,77.7063599','location=no');
  //  var web=this.inAppBrowser.create('https://www.google.com/maps/dir/?api=1&47.5951518,-122.3316393','location=no');
  }

}
