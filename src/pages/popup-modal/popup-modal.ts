import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,  AlertController } from 'ionic-angular';
//import { ProvideravailabiltypopupnewPage } from '../provideravailabiltypopupnew/provideravailabiltypopupnew';
import { FilterPage } from '../filter/filter';


@IonicPage()
@Component({
  selector: 'page-popup-modal',
  templateUrl: 'popup-modal.html',
})
export class PopupModalPage {
  rootPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public alertCtrl: AlertController,) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PopupModalPage');
  // }

  openHintModal() {
    this.openModal(FilterPage);
  }
  // openWalkthroughModal() {
  //   this.openModal('ProvideravailabiltypopupnewPage');
  // }
  // openSignupModal() {
  //   this.openModal('ProvideravailabiltypopupnewPage')
  // }
  openModal(FilterpagetwoPage) {
    this.modalCtrl.create('FilterpagetwoPage', null, { cssClass: 'inset-modal' })
                  .present();
  }



}
