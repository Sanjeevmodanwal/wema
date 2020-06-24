import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppState } from "../../AppStates";
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { DatePipe } from '@angular/common';
import { Platform } from 'ionic-angular';
import { ComposeemailPage } from '../composeemail/composeemail';
import { EmailThreadPage } from '../email-thread/email-thread';
import { CartPage } from '../cart/cart';
@IonicPage()
@Component({
  selector: 'page-emali',
  templateUrl: 'emali.html',
})
export class EmaliPage {  
  pet: string = "kittens";
  isAndroid: boolean = false;

  email:'';
  InboxEmails: any;
  SentEmails: any;
  public appState = AppState;
 // public navCtrl: NavController, private apiProvider: ApiProvider, private datePipe: DatePipe,private alertCtrl:AlertController
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private apiProvider: ApiProvider, private datePipe: DatePipe) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmaliPage');
     this.getInboxEmails();
    this.getSentEmails();
    
  }

  ionViewDidEnter() {
    this.getInboxEmails();
    this.getSentEmails();
  }

  /**
   * Cart click handler
   */
  viewCart() {
    this.navCtrl.push('CartPage');
  }


  doRefresh(refresher) {

    this.ionViewDidLoad()
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  /**
   * Handler for tab changes
   */
  // tabChange(data: any) {
  //   this.selectedTab = data.selectedTab;
  // }

  /**
   * Get all inbox emails
   */
  async getInboxEmails() {

    var filters: Array<{ fieldname: string, fieldvalue: string, operators: string }> = [];
    var userFilter =
      {
        fieldname: "userid",
        fieldvalue: AppState.UserCred['userid'],
        operators: "Equal"
      };

    filters.push(userFilter);

    if (!AppState.IsWemaLife) {
      var companyFilter =
        {
          fieldname: "companyid",
          fieldvalue: AppState.UserCred['companyid'],
          operators: "Equal"
        };
      filters.push(companyFilter);
    }

    var filterRequest =
      {
        app:true,
        auth:true,
        filter: filters,
        filterproperty:
          {
            offset: 0,
            orderby: "createdatetime",
            recordlimit: 0
          }
      };
      
    var response = await this.apiProvider.Post(AppConst.GET_INBOX_EMAILS, filterRequest).toPromise();
    if (response != null) {
      this.InboxEmails = response['records'];
      for (let i in this.InboxEmails) {
        this.InboxEmails[i]['senderprofilepic'] = (this.InboxEmails[i]['senderprofilepic'] == null || this.InboxEmails[i]['senderprofilepic'] == '') ? "assets/imgs/usergrey.png" : this.InboxEmails[i]['senderprofilepic'];

        var senderFullName = (this.InboxEmails[i]['sender'] == null || this.InboxEmails[i]['sender'] == '') ? "" : this.InboxEmails[i]['sender'];
        var ShortName = senderFullName.match(/\b(\w)/g);
        this.InboxEmails[i]['senderShortName'] = ShortName.join('');

       
      }

      
    }
  }

  /**
  * Get all sent emails
  */
  async getSentEmails() {

    var filters: Array<{ fieldname: string, fieldvalue: string, operators: string }> = [];
    var userFilter =
      {
        fieldname: "userid",
        fieldvalue: AppState.UserCred['userid'],
        operators: "Equal"
      };

    filters.push(userFilter);

    if (!AppState.IsWemaLife) {
      var companyFilter =
        {
          fieldname: "companyid",
          fieldvalue: AppState.UserCred['companyid'],
          operators: "Equal"
        };
      filters.push(companyFilter);
    }

    var filterRequest =
      {
        app:true,
        auth:true,
        filter: filters,
        filterproperty:
          {
            offset: 0,
            orderby: "createdatetime",
            recordlimit: 0
          }
      };

    var response = await this.apiProvider.Post(AppConst.GET_SENT_EMAILS, filterRequest).toPromise();
    if (response != null) {
      this.SentEmails = response['records'];
      for (let i in this.SentEmails) {
        this.SentEmails[i]['senderprofilepic'] = (this.SentEmails[i]['senderprofilepic'] == null || this.SentEmails[i]['senderprofilepic'] == '') ? "assets/imgs/usergrey.png" : this.SentEmails[i]['senderprofilepic'];

        var receiverFullName = (this.SentEmails[i]['receiver'] == null || this.SentEmails[i]['receiver'] == '') ? "" : this.SentEmails[i]['receiver'];
        var ShortName = receiverFullName.match(/\b(\w)/g);
        this.SentEmails[i]['receiverShortName'] = ShortName.join('');
      }
      
    }
  }
/**
* Compose Email button click handler
*/
 composeEmail() {
    this.navCtrl.push('ComposeemailPage');
  }
  /**
   * Inbox item click handler
   */
  inboxItemClick(item:any){
      this.navCtrl.push('EmailThreadPage',{isFromInbox:true,email:item});
  }

  /**
   * Sent item click handler
   */
  sentItemClick(item:any){
    this.navCtrl.push('EmailThreadPage',{isFromInbox:false,email:item});
}
}
