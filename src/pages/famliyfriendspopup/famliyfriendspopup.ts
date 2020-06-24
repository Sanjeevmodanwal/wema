import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ToastController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
/**
 * Generated class for the FamliyfriendspopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-famliyfriendspopup',
  templateUrl: 'famliyfriendspopup.html',
})
export class FamliyfriendspopupPage {
  data: any;
  loggedin:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  private view: ViewController,private alertCtrl :AlertController, private toastCtrl :ToastController,private apiProvider :ApiProvider, public platform: Platform) {
      this.data=navParams.data;
      this.loggedin = AppState.UserCred;
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FamliyfriendspopupPage');
  }

  ionViewWillLoad() {
  // this.data = this.navParams.get('data');
   // console.log(this.data);
  }
  allow(allow:any) {

      this.view.dismiss(this.data);
    
  }
  deny(allow:any) {

    this.view.dismiss('');
  
}
/**
   * delete member 
   * @param item 
   */
  async deleteMemberList(userdata: any) {
    console.log(userdata);
    this.alertCtrl.create({
      message: "Do you want to delete?",
      buttons: [
        'No',
        {
          text: "Yes",
          handler: () => {
            var request = {
              action: "Deletefriend",
              userid: userdata.userid,
              deletedby: AppState.UserCred.userid,
              companyid:  userdata.companyid
            };
            this.apiProvider.Post(AppConst.DELETE_MEMBER, request).subscribe((response) => {
              if (response != null && response['status']) {
                this.toastCtrl.create({
                  message:'User has been deleted.',
                  duration:2000
                }).present();
              
              }else if (response != null && !response['status']) {  
                this.toastCtrl.create({
                  message: response['message'],
                  duration: 2000
                }).present();
              } 
              else {
                this.toastCtrl.create({
                  message: 'Something went wrong',
                  duration: 2000
                }).present();
              }
            });
          }
        }
      ]
    }).present();
  }
}
