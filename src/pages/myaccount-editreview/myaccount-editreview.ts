import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';

/**
 * Generated class for the MyaccountEditreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myaccount-editreview',
  templateUrl: 'myaccount-editreview.html',
})
export class MyaccountEditreviewPage {
  selectedCompany: any;
  rating: any;
  comments: any;
  companypicture: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private apiProvider: ApiProvider,
  ) {
    console.log('inside MyaccountEditreviewPage');
    console.log(navParams.data);

    if(navParams.data != undefined){
      this.selectedCompany={
        "companyname": navParams.data.companyname,
        "appointmentid": navParams.data.appointmentid,
        "companyid": navParams.data.companyid,
      }

      this.companypicture = navParams.data.companylogo;
      this.comments = navParams.data.comments;
      this.rating = navParams.data.rating;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyaccountEditreviewPage');
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
      appointmentid: this.selectedCompany.appointmentid,
      comments: this.comments,
      companyid: this.selectedCompany.companyid,
      rating: this.rating
    };

    let response = await this.apiProvider
      .Post(AppConst.ADD_OR_UPDATE_COMMENTS, request)
      .toPromise();
    if (response != null && response["status"]) {
      this.toastCtrl
        .create({
          message: "Thanks for rating",
          duration: 2000
        })
        .present();
      this.navCtrl.pop();
    }
  }
  cancel(){
    this.navCtrl.pop();
  }

}
