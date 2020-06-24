import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AppState } from "../../AppStates";
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';

/**
 * Generated class for the ComposeemailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-composeemail',
  templateUrl: 'composeemail.html',
})
export class ComposeemailPage {
  @ViewChild('receiverInput', { read: ElementRef })
  private receiverInput: ElementRef;
  emails: any;
  isVisible = false;
  data = { sender: '', receiver: '', receiverId: '', subject: '', message: '' };
  disableEmailSearch:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiProvider: ApiProvider, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    if(navParams.data!=null)
    {
      this.data.sender=navParams.data.emailId;
      this.disableEmailSearch=navParams.data.disableEmailSearch;
    }
    this.data.sender = AppState.UserCred['firstname'] + ' ' + AppState.UserCred['lastname'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComposeemailPage');
  }

  /**
   * Suggestion item selected handler
   */
  onSelectedItem(item: any) {
    this.emails='';
    this.data.receiver = item['emailid'];
    this.data.receiverId = item['userid'];
    this.isVisible = false;
    //(this.receiverInput as any).value=item['emailid'];
  }

  /**
   * Send email
   */
  async sendEmail() {
    if (this.data.receiver != '' && this.data.subject != '' && this.data.receiverId != '' && this.data.message != '') {
      var request =
        {
          CompanyId: AppState.UserCred['companyid'],
          Message: this.data.message,
          Subject: this.data.subject,
          ReceiverId:[this.data.receiverId],
          SenderId: AppState.UserCred['userid'],
          Type: "0",
          MessageId: null
        };
      var response = await this.apiProvider.Post(AppConst.SEND_EMAIL, request).toPromise();
      if (response != null && response['status'] == true) {
        this.toastCtrl.create({
          message: 'Email has been sent successfully',
          duration: 1000
        }).present();
        this.navCtrl.pop();
      }
      else {
        this.toastCtrl.create({
          message: "Something went wrong, please try again",
          duration: 1000
        }).present();
      }
    }
    else {
      this.alertCtrl.create({
        message: "Please input all fields",
        buttons: ['Ok']
      }).present();
    }
  }

  /**
   * Email lookup
   */
  async searchEmail() {
    this.isVisible = true;
    if (this.data.receiver != '') {
      var request =
        {
          CompanyId: AppState.UserCred['companies']['0']['companyid'],
          UserId: AppState.UserCred['userid'],
          EmailId: this.data.receiver
        }
      var response = await this.apiProvider.Post(AppConst.EMAIL_LOOKUP, request).toPromise();
      if (response != null && response.hasOwnProperty('records') && response['records'].length > 0) {
        this.emails = response['records'];
      }
    }
  }

   composeEmail() {
    this.navCtrl.push('ComposeemailPage');
  }

}
