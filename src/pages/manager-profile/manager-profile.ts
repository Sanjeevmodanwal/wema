import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyaccountprofilePage } from '../myaccountprofile/myaccountprofile';
import { MyaccounteditprofilePage } from '../myaccounteditprofile/myaccounteditprofile';

/**
 * Generated class for the ManagerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manager-profile',
  templateUrl: 'manager-profile.html',
}) 
export class ManagerProfilePage {
  data: any;
  manager: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.data=navParams.data.profile.data 
  this.manager=navParams.data.response['records']['0'];
 console.log('----------------------');
  console.log(this.data);
  console.log('----------------------');
  }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad ManagerProfilePage', this.data,this.manager);
  }

  EditfriendProfile()
  {
    this.navCtrl.push('MyaccounteditprofilePage',this.navParams.data)
  }
}
