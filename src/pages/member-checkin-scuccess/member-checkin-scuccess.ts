import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";
import { DatePipe } from "../../../node_modules/@angular/common";

/**
 * Generated class for the MemberCheckinScuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-member-checkin-scuccess",
  templateUrl: "member-checkin-scuccess.html"
})
export class MemberCheckinScuccessPage {
  CheckedData: any;
  checkinTime: any;
  myRand: number;
  constructor(
    public navCtrl: NavController,
    private datePipe: DatePipe,
    public navParams: NavParams
  ) {
    console.log(navParams.data);
    this.CheckedData = navParams.data;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MemberCheckinScuccessPage");
    this.checkinTime = this.datePipe.transform(new Date(), "HH:mm a");
  }
  ionViewDidEnter() {
    this.myRand = this.random();
  }
  homePage() {
    if(this.CheckedData.checkInText == 'Check-out') {
      var homePageData = {
        fromPage: 'memberCheckinSuccess',
        checkedData: this.CheckedData
      };
      this.navCtrl.setRoot(HomePage, { data: homePageData });
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }

  random(): number {
    let rand = Math.floor(Math.random() * 20) + 1;
    return rand;
  }
}
