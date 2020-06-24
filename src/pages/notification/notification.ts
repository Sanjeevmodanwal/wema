import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { duration } from '../../../node_modules/moment';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  Notifications: Array<{ Title: string, Message: string, Time: string,id:string,Status:string }> = [];
  loader: any;
  constructor(private loadingCtrl:LoadingController, private tostCtr :ToastController, private apiProvider :ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');

    this.getNotifications();
  }


  
  /**
   * Get all the notifications
   */
  async getNotifications() {
    this.Notifications=[]
    var request = {
      userid: AppState.UserCred['userid']
    };
    //var response = await this.apiProvider.Post(AppConst.GET_NOTIFICATIONS, request).toPromise();
    this.apiProvider.Post(AppConst.GET_NOTIFICATIONS, request).subscribe((response)=>{
      this.loader =this.loadingCtrl.create({
       content:"please wait ..",
      //  duration:1000
     })
     this.loader.present()

      if (response != null) {
        this.loader.dismiss()
        for (let i in response) {
          var obj = JSON.parse(response[i]['message']);
          this.Notifications.push({ Title: obj['title'], Message: obj['message'], Time: response[i]['createddatetime'] ,id:response[i]['pushid'] ,Status:response[i]['status']});
        }
      }
      
      this.loader.dismiss()
    },
  (error)=>{
    this.loader.dismiss()
    console.log(error);
  });
    
  console.log(this.Notifications)
  }

  async removeItem(notification)
  {
    let request={
      notificationid:notification.id+'_pushnotification'
    }
    let response = await this.apiProvider.Post(AppConst.DeleteNotification,request).toPromise();
   if(response['status']==true)
   {
    // this.navCtrl.push(MyaccountnotificationPage)
   this.getNotifications();
    this.tostCtr.create({
      message:" Notification deleted ",
      duration: 1000
    }).present()
  
  }
  }
  public clear(): void {
   // this.Notifications=[]
    for(let i in this.Notifications)
    {
      this.removeItem(this.Notifications[i])
    }
  }

}
