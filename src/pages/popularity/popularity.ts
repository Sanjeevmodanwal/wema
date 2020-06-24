import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController, ActionSheetController} from 'ionic-angular';
import { PopularityPopupPage } from '../popularity-popup/popularity-popup';
//import { Slide } from 'ionic-angular';
import { CompanyProfilePage } from '../company-profile/company-profile';

/**
 * Generated class for the PopularityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popularity',
  templateUrl: 'popularity.html',
})
export class PopularityPage {

  constructor(public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController ) {
  console.log(navParams.data)
  }

  ionViewDidLoad() {

   // this.Filters()
    console.log('ionViewDidLoad PopularityPage');
 // this.navCtrl.push(CompanyProfilePage)
  }
  
Filters()
{
 let actionSheet = this.actionSheetCtrl.create({
            title: 'Popularity: ' ,
            buttons: [
              {
                text: 'Name',
                handler: () => {
                  console.log('reload')
                 // this.getCurrentPosition();
                }
              },
              {
                text: 'Diatance',
                handler: () => {
                  console.log('delete')
                //  this.storage.set('lastLocation', null);
                //  this.showToast('Location deleted!');
                //  this.initializeMap();
                }
              },
              {
                text: 'Ratings',
                handler: () => {
                  console.log('delete')
                //  this.storage.set('lastLocation', null);
                //  this.showToast('Location deleted!');
                //  this.initializeMap();
                }
              },
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                }
              }
            ]
          });
          actionSheet.present();
        }

  ClickOnpopup()
  {

 //   this.navCtrl.push(CompanyProfilePage)
/*console.log("in popup call")
  var bookServicePopup1 = this.modalCtrl.create( PopularityPopupPage, {data:""}, { enableBackdropDismiss: true });
  bookServicePopup1.onDidDismiss((data) => {
    
  });
  bookServicePopup1.present();

  */
}
  }
