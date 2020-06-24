import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage} from '@ionic/storage'
import { AppConst } from '../../AppConst';

/**
 * Generated class for the RecentlyVisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recently-visit',
  templateUrl: 'recently-visit.html',
})
export class RecentlyVisitPage {
  recientlyviewd= [];
  companypicture: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecentlyVisitPage');
    this.companypicture= AppConst.WEMA_DEV_ROOT+"images/company.jpg"
    this.storage.get('viewedList').then((data) => {
      if (data != null) {
        this.recientlyviewd = JSON.parse(data);
      console.log("================recently view=====================");
      console.log(this.recientlyviewd)
var ourArray = this.recientlyviewd
ourArray = ourArray.filter((value, index, array) => 
     !array.filter((v, i) => JSON.stringify(value) == JSON.stringify(v) && i < index).length);
     console.log("============================ourArray======");
console.log(ourArray);
this.recientlyviewd=ourArray
console.log("============================ourArray======");

      console.log("================recently view=====================");
  
        }


        
        
console.log(data)
    });
  }


  
  itemTapped( item){
    // console.log($event)
  
    if(item.listingtype=="company"){
    item["serviceid"]='55'
    this.navCtrl.push('CompanyProfilePage',item);
   // this.navCtrl.push(CompanyProfilePage)
     // console.log(item)
   }
   else
   {
     item["serviceid"]='55'
    this.navCtrl.push('ProviderInfoPage',  item);
   // this.navCtrl.push(CompanyProfilePage)
      console.log(item)
   }
   }
}
