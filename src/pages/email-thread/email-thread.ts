import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';

/**
 * Generated class for the EmailThreadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email-thread',
  templateUrl: 'email-thread.html',
})
export class EmailThreadPage {

  message: any;
  email: any;
  isFromInbox: boolean;
  //itemExpandHeight=200;
  items: any;//=[{expanded:false},{expanded:false},{expanded:false},{expanded:false}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider, private toastCtrl: ToastController) {
    this.isFromInbox = navParams.get('isFromInbox');
    this.email = navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailThreadPage');
    this.getEmailThread();
  }

  /**
   * Expand list item
   * @param item 
   */
  expandItem(item) {

    this.items.map((listItem) => {

      if (item == listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }

      return listItem;

    });
  }

  /**
   * Get email thread
   */
  async getEmailThread() {
    var messageId = '';
    var request =
      {
        CompanyId: AppState.IsWemaLife ? null : AppState.UserCred['companyid'],
        From: this.isFromInbox ? "inbox" : "sent",
        UserId: AppState.UserCred['userid'],
        MessageId: this.isFromInbox ? (this.email['parentid'] == '0' ? this.email['messageid'] : this.email['parentid']) : this.email['messageid']
      };
    var response = await this.apiProvider.Post(AppConst.GET_EMAIL_MESSAGE, request).toPromise();
    if (response != null) {
      this.items = response['records'];
      for (let i in this.items) {
        this.items[i]['expanded'] = false;
      }
    }
  }

  /**
   * Reply to the email
   */
  async reply() {
    var request =
      {
        CompanyId: AppState.UserCred['companyid'],
        Message: this.message,
        Subject: this.email['subject'],
        SenderId: AppState.UserCred['userid'],
        MessageId: this.email['parentid'] != "0" ? this.email['parentid'] : this.email['messageid'],
        Type: "1"
      };

    var response = await this.apiProvider.Post(AppConst.SEND_EMAIL, request).toPromise();
    if (response != null && response['status'] == true) {
      this.toastCtrl.create({
        message: "Email has been sent successfully",
        duration: 1000
      }).present();
      await this.getEmailThread();
    }
    else
      this.toastCtrl.create({
        message: "Something went wrong, please try again",
        duration: 1000
      }).present();
  }

}
