import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { AppState } from "../../AppStates";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
/**
 * Generated class for the SelectComapanyForareviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-select-comapany-forareview",
  templateUrl: "select-comapany-forareview.html"
})
export class SelectComapanyForareviewPage {
  data: any;
  callback: any;
  companypicture: string;
  constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController,
    private apiProvider: ApiProvider,
    public navParams: NavParams
  ) {
    this.data = navParams.data;
    // console.log(this.data)
    this.companypicture =
      AppConst.WEMA_DEV_ROOT + "images/no-service-icon-black.png";
    // this.ShowReview()
  }
  async ShowReview() {
    let request = {
      memberid: AppState.UserCred["userid"]
    };
    let response = await this.apiProvider
      .Post(AppConst.GET_PAST_VISITS, request)
      .toPromise();
    if (response != null) {
      this.data = response["records"];
    }
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad SelectComapanyForareviewPage");
  }
  selectedCompany(item) {
    // console.log(item)
    this.viewCtrl.dismiss(item);
    //this.callback = this.navParams.get("item")
  }
}
