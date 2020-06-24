import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import { AppState } from "../../AppStates";
import { MyAccountAddReviewPage } from "../my-account-add-review/my-account-add-review";
import { MyaccountEditreviewPage } from '../myaccount-editreview/myaccount-editreview';
/**
 * Generated class for the MyaccountReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-myaccount-review",
  templateUrl: "myaccount-review.html"
})
export class MyaccountReviewPage {
  Review: Object;
  companypicture: string;
  companyimange: Object;
  loader: any;
  isReviewEmpty: boolean = true;
  constructor(
    public navCtrl: NavController,
    private loadingController: LoadingController,
    public navParams: NavParams,
    private apiProvider: ApiProvider
  ) {}
  ionViewDidLoad() {
    console.log("ionViewDidLoad MyaccountReviewPage");
    this.loader = this.loadingController.create({
      content: "Please wait.."
    });
    this.loader.present();
    this.ShowReview();
    this.companypicture =
      AppConst.WEMA_DEV_ROOT + "images/no-service-icon-black.png";
  }
  ionViewDidEnter() {
    console.log("ionViewDidEnter MyaccountReviewPage");
    this.ShowReview();
    this.showcompany();
  }
  async ShowReview() {
    let request = {
      memberid: AppState.UserCred["userid"]
    };
    let response = await this.apiProvider
      .Post(AppConst.GET_PAST_VISITS, request)
      .toPromise();
    if (response != null) {
      this.Review = response["records"];
      if (response["totalrecord"] != "0") {
        this.isReviewEmpty = false;
      }
    }
  }
  async showcompany() {
    let response = await this.apiProvider
      .Post(AppConst.GET_COMPANY_LIST, "")
      .toPromise();
    console.log(response);
    this.companyimange = response;
    for (let i in this.companyimange) {
      for (let j in this.Review) {
        if (this.companyimange[i].companyid == this.Review[j].companyid) {
          this.Review[j]["companylogo"] = this.companyimange[
            i
          ].settings.companylogo;
        }
      }
    }
    this.loader.dismiss();
    console.log(this.Review);
  }
  //http://wema-3.eu-west-2.elasticbeanstalk.com/images/no-service-icon-black.png
  addReview() {
    console.log("in add review");
    this.navCtrl.push("MyAccountAddReviewPage", this.Review);
  }

  editReview(review){
    console.log('inside editReview');
    this.navCtrl.push("MyaccountEditreviewPage", review);
    // console.log(JSON.stringify(review));
  }
}
