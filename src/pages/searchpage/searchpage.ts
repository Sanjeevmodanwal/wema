import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { SearchServicesPage } from '../search-services/search-services';
import { SearchlocationPage } from '../searchlocation/searchlocation';
import { AnytimePage } from '../anytime/anytime';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the SearchpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchpage',
  templateUrl: 'searchpage.html',
})
export class SearchpagePage {
  Selectedservice:any;
  service: any;
  postcode: any;
  Time: any;
  Services: any;
  LocaionDate: any;
  TimeData: any;

  constructor( private alertCtrl:AlertController,public navCtrl: NavController,private modalCtrl: ModalController, public navParams: NavParams ,public viewCtrl : ViewController ) {
//  if(navParams.data.servicename!=null)
//  {
//   this.Selectedservice=navParams.data
//  }
//     else if(navParams.data!="postcode")
//     {
//       this.postcode=navParams.data
//     }
  //  this.postcode=navParams.data
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SearchpagePage');
    // console.log(this.postcode)
    // if(this.Selectedservice!=null)
    // {
    //   console.log("in seaedsd")
    //   this.service=this.Selectedservice.servicename
    //   this.postcode=this.Selectedservice.postcode
    // }
   
  }

  SeachServices()
  {
    console.log("servies")
  // this.navCtrl.push(SearchServicesPage)
 //  this.navCtrl.push(SearchlocationPage)
   var bookServicePopup = this.modalCtrl.create('SearchServicesPage',{}, { enableBackdropDismiss: true });
  bookServicePopup.onDidDismiss(async (data) => {
 
  console.log(data)
  
  this.service=data.servicename
  this.Services=data
});
bookServicePopup.present();
  //   var bookServicePopup = this.modalCtrl.create(SearchServicesPage, { enableBackdropDismiss: true });
  //  bookServicePopup.onDidDismiss(async (data) => {

 
  // });
  }
  SeachLocation()
  {
    console.log("locaion ")
   // this.navCtrl.push(SearchlocationPage)
    var bookServicePopup1 = this.modalCtrl.create('SearchlocationPage', { enableBackdropDismiss: true });
   bookServicePopup1.onDidDismiss(async (data) => {
   console.log(data)
   this.LocaionDate=data
   this.postcode=data.postcode;

   

});
bookServicePopup1.present();
  }

  SearchTime()
  {
    var bookServicePopup2 = this.modalCtrl.create('AnytimePage', { enableBackdropDismiss: true });
   bookServicePopup2.onDidDismiss(async (data) => {
  
   console.log(data)
   this.TimeData=data
this.Time=data.Date
});
bookServicePopup2.present();
  }


  Search()
  {

    if(this.Services!=null)
    {
 this.navCtrl.push('TabsPage', {Services:this.Services,location:this.LocaionDate,Time:this.TimeData})
    }
    else
    {
      this.alertCtrl.create({
        message: "Please select the  services",
        buttons: ['Ok']
      }).present();
    
    }
  }
}
