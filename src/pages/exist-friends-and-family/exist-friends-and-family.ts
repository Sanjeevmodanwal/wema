import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { Helper } from '../../helpers/helper';

/**
 * Generated class for the ExistFriendsAndFamilyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exist-friends-and-family',
  templateUrl: 'exist-friends-and-family.html',
})
export class ExistFriendsAndFamilyPage {

  emailId: any='';
  relationship: any='';
  bottomPad = '10px';
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController, private apiProvider: ApiProvider) {
    this.bottomPad = navParams.get('isDashboard') != null ? '60px' : '10px'
  }

  /**
   * Add a friend
   */
  async add() {
    if (!AppState.IsWemaLife && (AppState.UserCred.currentCompanyId == null || AppState.UserCred.currentCompanyId == '')) {
      this.alertCtrl.create({
        message: 'Please set the company information clearly'
      }).present();
      return;
    }
    else {
      if (this.emailId == '' || Helper.emailPattern.test(this.emailId) == false)
        this.toastCtrl.create({
          message: 'Invalid emailid',
          duration: 2000
        }).present();
      else if (this.relationship == '')
        this.toastCtrl.create({
          message: "Relationship can't be empty",
          duration: 2000
        }).present();
      else {
        var request = {
          action: 'C',
          createdby: AppState.UserCred.userid,
          formid: '1',
          usertypeid: '7',
          userId: AppState.UserCred.userid,
          membertype: 'someone',
          memberstatus: '2',
          register: {
            emailid: this.emailId,
            relationship: this.relationship,
            companyid: AppState.UserCred.currentCompanyId
          },
          member: {
            companyid: AppState.UserCred.currentCompanyId
          }
        };
        if (!AppState.IsWemaLife)
          request['companyid'] = AppState.UserCred.currentCompanyId;

        let response = await this.apiProvider.Post(AppConst.REGISTER, request).toPromise();
        if (response != null && response['status']) {
          this.toastCtrl.create({
            message: response['message'],
            duration: 2000
          }).present();
          this.navCtrl.pop();
          this.navCtrl.pop();
        }
        else if (response != null) {
          this.alertCtrl.create({
            message: response['message']
          }).present();
        }
      }
    }
  }
}
