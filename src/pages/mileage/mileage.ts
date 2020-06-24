import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions } from 'ionic-angular';
import { MileagepopupPage } from '../mileagepopup/mileagepopup';

@IonicPage()
@Component({
  selector: 'page-mileage',
  templateUrl: 'mileage.html',
})
export class MileagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MileagePage');
  }

  openModal() {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModalData = {
      name: 'Paul Halliday',  
      occupation: 'Developer'
    };

    const myModal: Modal = this.modal.create(MileagepopupPage, { data: myModalData }, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {
      console.log("I have dismissed."); 
      console.log(data);
    });

    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });
  
  }

}
