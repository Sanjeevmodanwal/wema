import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Renderer
} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import { AppState } from "../../AppStates";
/**
 * Generated class for the MyAccountAddReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-my-account-add-review",
  templateUrl: "my-account-add-review.html"
})
export class MyAccountAddReviewPage {
  selectedCompany: any;
  rating: any;
  comments: any;
  companypicture: string;
  data: any;
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private apiProvider: ApiProvider,
    private modalCtrl: ModalController,
    public navParams: NavParams
  ) {
    console.log('inside MyAccountAddReviewPage constructor');

    console.log(navParams.data);

    // this.data = navParams.get('data');
    this.data = navParams.data;
    console.log(this.data);

    if( this.data.company_name != undefined ) {
      this.companypicture = this.data.image;
      this.selectedCompany = {
        "companyname": this.data.company_name,
        "providername": this.data.provider_name,
        "servicename": this.data.service,
        "companylogo": this.data.image,
        "appointmentid": this.data.appointmentid,
        "companyid": this.data.companyid
      };
      // this.selectedCompany['companyname'] = this.data.company_name;
      // this.selectedCompany['providername'] = this.data.provider_name;
    } else {
      this.selectedCompany = navParams.data["0"];
    }

    console.log('this.selectedCompany: ');
    console.log(JSON.stringify(this.selectedCompany));

    if (this.selectedCompany.hasOwnProperty("companylogo")) {
      if (this.selectedCompany.companylogo != "") {
        this.companypicture = this.selectedCompany.companylogo;
      }
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MyAccountAddReviewPage");
    if(this.companypicture == "" || this.companypicture == undefined){
      this.companypicture = AppConst.WEMA_DEV_ROOT + "images/no-service-icon-black.png";
    }
  }

  SelectCompany() {
    console.log(this.rating);
    var bookServicePopup = this.modalCtrl.create(
      "SelectComapanyForareviewPage",
      this.navParams.data,
      { enableBackdropDismiss: false }
    );
    bookServicePopup.onDidDismiss(async data => {
      console.log(data);
      this.selectedCompany = data;
      if (this.selectedCompany.hasOwnProperty("companylogo")) {
        if (this.selectedCompany.companylogo != "") {
          this.companypicture = this.selectedCompany.companylogo;
        }
      }
    });
    bookServicePopup.present();
    // this.navCtrl.push(SelectComapanyForareviewPage,this.navParams.data)
  }

  submit() {
    if ((this.comments == undefined || this.comments == '' )|| (this.rating == undefined || this.rating == '')) {
      this.toastCtrl
        .create({
          message: "Please give comment/ratings about service",
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

    console.log(JSON.stringify(request));

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
