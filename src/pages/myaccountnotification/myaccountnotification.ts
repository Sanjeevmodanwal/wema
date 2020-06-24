import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from "ionic-angular";
import { AppState } from "../../AppStates";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
/**
 * Generated class for the MyaccountnotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-myaccountnotification",
  templateUrl: "myaccountnotification.html"
})
export class MyaccountnotificationPage {
  Notifications: Array<{
    Title: string;
    Message: string;
    Time: string;
    id: string;
    Status: string;
  }> = [];
  loader: any;
  constructor(
    public navCtrl: NavController,
    private loadingcontroller: LoadingController,
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    private tostCtr: ToastController
  ) {}
  ionViewDidLoad() {
    this.loader = this.loadingcontroller.create({
      content: "please wait.."
    });
    this.loader.present();
    // console.log("ionViewDidLoad MyaccountnotificationPage");
    this.getNotifications();
  }
  /**
   * Get all the notifications
   */
  async getNotifications() {
    this.Notifications = [];
    var request = {
      memberid: AppState.UserCred["userid"]
    };
    //var response = await this.apiProvider.Post(AppConst.GET_NOTIFICATIONS, request).toPromise();
    this.apiProvider.Post(AppConst.USER_NOTIFICATIONS, request).subscribe(
      response => {
        if (response != null) {
          for (let i in response["records"]["pushnoifi"]) {
            var obj = JSON.parse(
              response["records"]["pushnoifi"][i]["message"]
            );
            this.Notifications.push({
              Title: obj["title"],
              Message: obj["message"],
              Time: response["records"]["pushnoifi"][i]["createddatetime"],
              id: response["records"]["pushnoifi"][i]["notificationid"],
              Status: response["records"]["pushnoifi"][i]["status"]
            });
            this.loader.dismiss();
          }
        }
        this.loader.dismiss();
      },
      error => {
        // console.log(error);
        this.loader.dismiss();
      }
    );
    // console.log(this.Notifications);
    this.loader.dismiss();
  }
  async removeItem(notification: any) {
    // console.log(notification);
    // console.log("in remove notification");
    let request = {
      notificationid: notification.id + "_pushnotification"
    };
    let response = await this.apiProvider
      .Post(AppConst.DeleteNotification, request)
      .toPromise();
    if (response["status"] == true) {
      // this.navCtrl.push(MyaccountnotificationPage)
      this.getNotifications();
      this.tostCtr
        .create({
          message: " Notification deleted ",
          duration: 1000
        })
        .present();
    }
  }
}
