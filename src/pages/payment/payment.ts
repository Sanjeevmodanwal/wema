// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
// import { InAppBrowser, InAppBrowserOptions, InAppBrowserEvent } from "@ionic-native/in-app-browser";
// import { AppState } from '../../AppStates';
// import { AdhocPaymentReceiptPage } from '../adhoc-payment-receipt/adhoc-payment-receipt';
// import { PaymentReceiptPage } from '../payment-receipt/payment-receipt';

// /**
//  * Generated class for the PaymentPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @IonicPage()
// @Component({
//   selector: 'page-payment',
//   templateUrl: 'payment.html',
// })
// export class PaymentPage {

//   options: InAppBrowserOptions = {
//     location: 'yes',//Or 'no' 
//     hidden: 'no', //Or  'yes'
//     clearcache: 'yes',
//     clearsessioncache: 'yes',
//     zoom: 'yes',//Android only ,shows browser zoom controls 
//     hardwareback: 'yes',
//     mediaPlaybackRequiresUserAction: 'no',
//     shouldPauseOnSuspend: 'no', //Android only 
//     closebuttoncaption: 'Close', //iOS only
//     disallowoverscroll: 'no', //iOS only 
//     toolbar: 'yes', //iOS only 
//     enableViewportScale: 'no', //iOS only 
//     allowInlineMediaPlayback: 'no',//iOS only 
//     presentationstyle: 'pagesheet',//iOS only 
//     fullscreen: 'yes',//Windows only    
//   };
//   data: any;

//   constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser, private toastCtrl: ToastController,private alertCtrl:AlertController) {
//     this.data = navParams.data;
//     console.log(this.data)
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad PaymentPage');
//   }

//   ionViewDidEnter() {
//     console.log(AppState.UserCred);
//     let companyId = (AppState.IsWemaLife && this.data.isadhoc == false) ? AppState.UserCred.wemaCurrentCompanyId : AppState.UserCred.currentCompanyId;
//     var paymentUrl = this.data.paymenturl + '&userid=' + this.data.memberid + '&companyid=' + companyId;
//     //var paymentUrl='http://wema-env-design.eu-west-2.elasticbeanstalk.com/data/payment/payu?orderid=197&sourceapi=wemalife&rescheduleid=0&t=1&r='+'&userid='+this.data.memberid+'&companyid='+companyId;
//     console.log(paymentUrl);
//     this.openPaymentUrl(paymentUrl);
//   }

//   /**
//    * Open payment url within app browser
//    * @param url 
//    */
//   openPaymentUrl(url: string) {
//     //let target = "_system";
//     let target = "_blank";
//     //let target = "_self";
//     var web = this.inAppBrowser.create(url, target, 'location=no');
//     // web.on('loadstart').subscribe((event: InAppBrowserEvent) => {
//     //   this.toastCtrl.create({
//     //     message: 'loadstart: ' + event.url,
//     //     duration: 5000
//     //   }).present();
//     //   web.close();
//     //   this.navCtrl.push(AdhocPaymentReceiptPage, this.navParams.data);
//     // }); 
//     web.on('loadstop').subscribe((event: InAppBrowserEvent) => {
//       var urls = event.url.split('/');
//       var page = urls[urls.length - 1].split('?')[0];

//       if (page == "error" || page == "exception" || page == "cancel") {
//         web.close();
//         this.toastCtrl.create({
//           message: 'something went wrong'
//         }).present();
//       }
      
//       else if (page == "success") {
//         if (this.data.hasOwnProperty('isadhoc') && this.data['isadhoc']) {
//           this.data["paylater"] = false;
//           //this.data["orderid"] = ;
//           this.data["hasBackButton"] = false;
//           web.close();
//           this.navCtrl.push(AdhocPaymentReceiptPage, this.navParams.data);
//         }
//         else {
//           //this.data["orderid"] = ;
//           this.data["hasBackButton"] = false;
//           web.close();
//           this.navCtrl.push(PaymentReceiptPage, this.navParams.data);
//         }
//       }
//     });
//     web.on('loaderror').subscribe((event: InAppBrowserEvent) => {
//       // this.toastCtrl.create({
//       //   message: 'loaderror:' + event.url,
//       //   duration: 5000
//       // }).present();
//       // web.close();
//       // this.navCtrl.push(AdhocPaymentReceiptPage, this.navParams.data);
//     });
//   //   web.on('exit').subscribe((event: InAppBrowserEvent) => {
//   //     this.toastCtrl.create({
//   //       message: 'exit:' + event.url,
//   //       duration: 5000
//   //     }).present();
//   //     //web.close();
//   //     //this.navCtrl.push(AdhocPaymentReceiptPage, this.navParams.data);
//   //   });
//   }
// }
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions, InAppBrowserEvent } from "@ionic-native/in-app-browser";
import { AppState } from '../../AppStates';
import { AdhocPaymentReceiptPage } from '../adhoc-payment-receipt/adhoc-payment-receipt';
import { PaymentReceiptPage } from '../payment-receipt/payment-receipt';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

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
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser, private toastCtrl: ToastController,private alertCtrl:AlertController) {
    this.data = navParams.data;
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  ionViewDidEnter() {
    console.log(AppState.UserCred);
    let companyId = (AppState.IsWemaLife && this.data.isadhoc == false) ? AppState.UserCred.wemaCurrentCompanyId : AppState.UserCred.currentCompanyId;
    //let companyId =this.data.carts[0].companyid
   /// this.data.paymenturl = ''
   
    var paymentUrl = this.data.paymenturl + '&userid=' + this.data.memberid + '&companyid=' + companyId;
    //var paymentUrl='http://wema-env-design.eu-west-2.elasticbeanstalk.com/data/payment/payu?orderid=197&sourceapi=wemalife&rescheduleid=0&t=1&r='+'&userid='+this.data.memberid+'&companyid='+companyId;
    console.log(paymentUrl);
    this.openPaymentUrl(paymentUrl);
  }

  /**
   * Open payment url within app browser
   * @param url 
   */
  openPaymentUrl(url: string) {
    //let target = "_system";
    let target = "_blank";
    //let target = "_self";
    var web = this.inAppBrowser.create(url, target, 'location=no');
    web.on('loadstart').subscribe((event: InAppBrowserEvent) => {
      this.toastCtrl.create({
        message: 'loadstart: ' + event.url,
        duration: 3000
      }).present();
      //web.close();
      //this.navCtrl.push(AdhocPaymentReceiptPage, this.navParams.data);
    }); 
    web.on('loadstop').subscribe((event: InAppBrowserEvent) => {
console.log('loadstop',event.url)
      var urls = event.url.split('/');
      var page = urls[urls.length - 1].split('?')[0];
         console.log('loadstop',page)
      if (page == "error" || page == "exception" || page == "cancel") {
        web.close();
        this.toastCtrl.create({
          message: 'something went wrong',
          duration: 2000
        }).present();
      }
      else if (page == "success") {
        if (this.data.hasOwnProperty('isadhoc') && this.data['isadhoc']) {
          this.data["paylater"] = false;
          //this.data["orderid"] = ;
          this.data["hasBackButton"] = false;
          web.close();
          this.navCtrl.push('AdhocPaymentReceiptPage', this.navParams.data);
        }
        else {
          //this.data["orderid"] = ;
          this.data["hasBackButton"] = false;
          web.close();
          this.navCtrl.push('PaymentReceiptPage', this.navParams.data);
        }
      }
    });
    web.on('loaderror').subscribe((event: InAppBrowserEvent) => {
      // console.log('load error')
      // this.toastCtrl.create({
      //   message: 'loaderror:' + event.url,
      //   duration: 5000
      // }).present();
      // web.close();
      //this.navCtrl.push(AdhocPaymentReceiptPage, this.navParams.data);
    });
    web.on('exit').subscribe((event: InAppBrowserEvent) => {
      // console.log('exit')
      // this.toastCtrl.create({
      //   message: 'exit:' + event.url,
      //   duration: 5000
      // }).present();
      //web.close();
      //this.navCtrl.push(AdhocPaymentReceiptPage, this.navParams.data);
    });
  }
}


