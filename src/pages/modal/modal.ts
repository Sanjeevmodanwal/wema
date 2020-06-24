import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  data: any;
  rating: any;
  comments: any;
  companypicture: String ="";
  selectedCompany: any;
  

  constructor(
    public navCtrl: NavController, 
    private apiProvider: ApiProvider,
    public navParams: NavParams, 
    private viewController: ViewController, 
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    console.log('inside modal constructor');

    this.data = navParams.get('data');
    console.log(this.data);

    if( this.data != undefined ){
      this.companypicture = this.data.image;
      this.selectedCompany = {
        "companyname": this.data.company_name,
        "providername": this.data.provider_name,
        "servicename": this.data.service
      };
      // this.selectedCompany['companyname'] = this.data.company_name;
      // this.selectedCompany['providername'] = this.data.provider_name;
    }

    console.log(this.companypicture);
    console.log(this.selectedCompany.companyname);
    console.log(this.selectedCompany.providername);
  }
  closeModal(){
    this.viewController.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  submit() {
    if (this.comments == null && this.comments == "") {
      this.toastCtrl
        .create({
          message: "Please give comment about service",
          duration: 2000
        })
        .present();
      return;
    } else {
      this.AddReview();
    }
  }
  async AddReview() {
    let request = {
      ApptSource: "wemalife",
      action: "rating",
      // appointmentid: this.selectedCompany.appointmentid,
      appointmentid: this.data.appointmentid,
      comments: this.comments,
      // companyid: this.selectedCompany.companyid,
      companyid: this.data.companyid,
      rating: this.rating
    };

    let response = await this.apiProvider
      .Post(AppConst.ADD_OR_UPDATE_COMMENTS, request)
      .toPromise();
    if (response != null && response["status"]) {
      this.navCtrl.pop();
      this.showAlertmessage();
    }
  }

  showAlertmessage(){
    this.alertCtrl
      .create({
        message: 'Thank you for submitting your review.',
        buttons: ['OK']
      })
    .present();
  }
}
