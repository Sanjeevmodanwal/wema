import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
  ModalController,
  ToastController
} from "ionic-angular";
import { AppState } from "../../AppStates";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
/**
 * Generated class for the PastVisitsReportPopUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-visits-report-pop-up",
  templateUrl: "visit-report-pop-up.html"
})
export class VisitReportPopUpPage {
  data: any;
  public appState = AppState;
  IsMember = true;
  PastVisitsReport: any;
  rating: any;
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private apiProvider: ApiProvider,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    modalCtrl: ModalController
  ) {
    this.data = navParams.data;
    console.log(this.data);
    console.log(this.appState);
    console.log(this.appState.IsMember);
    console.log('appState: '+JSON.stringify(this.appState));
  }
  ionViewDidEnter() {}
  async updateComment() {
    console.log(this.data);
    var request = {
      Action: "rating",
      //Action: "visitreport",
      AppointmentId: this.data.appointmentid,
      Comments: this.data.comments,
      Activities: this.data.activities,
      CompanyId: this.data.apptcompanyid,
      ApptSource: this.data.apptsource,
      Providerreport: this.data.providerreport,
      companyid: AppState.UserCred.currentCompanyId,
      rating: this.data.rating
    };
    if (AppState.IsMember) request["memberid"] = AppState.UserCred.userid;
    else request["providerid"] = AppState.UserCred.userid;
    let response = await this.apiProvider
      .Post(AppConst.ADD_OR_UPDATE_COMMENTS, request)
      .toPromise();
    if (response != null && response["status"]) {
      this.toastCtrl
        .create({
          message: "Comments Updated Successfully",
          duration: 2000
        })
        .present();
      this.viewCtrl.dismiss();
    } else {
      this.toastCtrl
        .create({
          message: "Something went wrong, please try again",
          duration: 1000
        })
        .present();
    }
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
