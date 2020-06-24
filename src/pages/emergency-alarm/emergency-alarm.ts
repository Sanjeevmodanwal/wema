import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { EmergencyalarmpopupPage } from '../emergencyalarmpopup/emergencyalarmpopup';
import { AppState } from '../../AppStates';
import{ApiProvider} from'../../providers/api/api'
import { AppConst } from '../../AppConst';
/**
 * Generated class for the EmergencyAlarmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-emergency-alarm',
  templateUrl: 'emergency-alarm.html',
})
export class EmergencyAlarmPage {

  constructor(public apiProvider :ApiProvider ,public navCtrl: NavController, public modalCtrl :ModalController,public navParams: NavParams,private toastCtrl :ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmergencyAlarmPage');
  }
  openModal()
  {
    let Alarmreason = this.modalCtrl.create('EmergencyalarmpopupPage', { title: '', appointment:'' });
    Alarmreason.onDidDismiss((reason) => {
      if (reason != null)

        this.sendAlarm( reason );
    });
    Alarmreason.present();
  }


    
  /**
   * Send emergency alarm
   */
  async sendAlarm(reason) {
    if(reason!=null)
    {
    let request = {
      action: 'send',
      comments:reason,
      userid: AppState.UserCred.userid,
      companyid: AppState.UserCred.currentCompanyId,
      latitude: AppState.UserCred.latitude,
      longitude: AppState.UserCred.longitude
    };

    let response=await this.apiProvider.Post(AppConst.SEND_EMERGENCY_ALARM,request).toPromise();
    if(response!=null&& response.hasOwnProperty('status')&&response['status']){
      this.toastCtrl.create({
        message:'Alarm raised successfully',
        duration:2000
      }).present();
    }
  }
  }
}

