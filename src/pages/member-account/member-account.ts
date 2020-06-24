import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  LoadingController,
  Events
} from "ionic-angular";
import { AppState } from "../../AppStates";
import { ApiProvider } from "../../providers/api/api";
import { HomePage } from "../home/home";
import { AppConst } from "../../AppConst";
import { Storage } from "@ionic/storage";
import { DatePipe, NgClass } from "@angular/common";
import { AppointmentPage } from "../appointment/appointment";
//import { AppointmentsPage } from '../appointments/appointments';
import { Helper } from "../../helpers/helper";
import { UpcomingappointmentPage } from "../upcomingappointment/upcomingappointment";
import { AppointmenthistoryPage } from "../appointmenthistory/appointmenthistory";
import { FamilyfriendsPage } from "../familyfriends/familyfriends";
import { MyaccountnotificationPage } from "../myaccountnotification/myaccountnotification";
import { MyaccountReviewPage } from "../myaccount-review/myaccount-review";
import { ProfilePage } from "../profile/profile";
import { SelectionPage } from "../selection/selection";
import { ProviderDashboardPage } from "../provider-dashboard/provider-dashboard";
import { ChatPage } from "../chat/chat";
import { SubscriptionplanPage } from "../subscriptionplan/subscriptionplan";
import { AppointmentsPage } from "../appointments/appointments";
/**
 * Generated class for the MemberAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-member-account",
  templateUrl: "member-account.html"
})
export class MemberAccountPage {
  public appstate = AppState;
  loginStatus: boolean;
  // rootPage: any = SelectionPage;
  currentNavigatedDateMonth: Date;
  remeberUserId: boolean;
  userId: "";
  monthAppointments: any;
  currentMonthDates = [];
  MissedApppointments = [];
  DoneAppointments = [];
  UpcommingAppointments = [];
  loader: any;
  currentDate = new Date();
  monthHeader: any;
  numbercount: 0;
  isAppointmentsEmpty: boolean = true;
  Notifications: Array<{
    Title: string;
    Message: string;
    Time: string;
    id: string;
    Status: string;
  }> = [];
  constructor(
    public navCtrl: NavController,
    private loadingcontroller: LoadingController,
    private events: Events,
    private datePipe: DatePipe,
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.currentNavigatedDateMonth = this.currentDate;
    AppState.PaymentGatewayId =
      AppState.UserCred.formvalues["country"] == "2" ? "4" : "3";
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad MemberAccountPage');
    //console.log(this.appstate.UserCred)
    this.loader = this.loadingcontroller.create({
      content: "please wait.."
    });
    this.loader.present();
    this.getMonthAppointments();
    this.getNotifications();
    this.monthHeader = Helper.getFullMonth(
      this.currentNavigatedDateMonth.getMonth()
    );
    if (!AppState.IsMember) {
      this.navCtrl.push(ProviderDashboardPage);
      //console.log("redirected at provider dashboard page");
    }
  }
  // async openPage() {
  //   var loggedOut;
  //    {
  //     if (AppState.IsMember && AppState.UserCred.usertypeid == "4") {
  //        loggedOut = await this.logoutApp();
  //       if (!loggedOut) {
  //         this.toastCtrl.create({
  //           message: "Cannot logged out, please try again",
  //           duration: 1000
  //         }).present();
  //       }
  //       else {
  //         this.storage.clear();
  //         this.storage.set('intro-done', true);
  //         this.toastCtrl.create({
  //           message: "Logged out successfully",
  //           duration: 1000
  //         }).present();
  //         this.loginStatus=false
  //       this.navCtrl.setRoot(SelectionPage)
  //  //window.location.reload();
  //        this.rootPage = HomePage;
  //       }
  //     }
  //     else {
  //        loggedOut = await this.logoutApp();
  //       if (!loggedOut) {
  //         this.toastCtrl.create({
  //           message: "Cannot logged out, please try again",
  //           duration: 1000
  //         }).present();
  //       }
  //       else {
  //         this.storage.clear();
  //         this.storage.set('intro-done', true);
  //         this.toastCtrl.create({
  //           message: "Logged out successfully",
  //           duration: 1000
  //         }).present();
  //        // this.rootPage = HomePage;
  //       }
  //     }
  //   }
  // }
  // async logoutApp() {
  //   var request =
  //   {
  //     DeviceCode: AppState.DeviceToken,
  //     UserId: AppState.UserCred['userid']
  //   };
  //   var response = await this.apiProvider.Post(AppConst.LOGOUT, request).toPromise();
  //   if (response != null && response['status'] == true) {
  //     AppState.UserCred['frienduserid'] = "0";
  //     return true;
  //   }
  //   if (!response['status'] && !response['devicecode']) {
  //     return true;
  //    // this.ionViewDidLoad()
  //   }
  //   return false;
  //  // this.ionViewDidLoad()
  // }
  /**
   * Open a page on navigation menu item click
   * @param page
   */
  async openPage() {
    var loggedOut;
    if (AppState.IsMember && AppState.UserCred.usertypeid == "4") {
      loggedOut = await this.logoutApp();
      if (!loggedOut) {
        this.toastCtrl
          .create({
            message: "Cannot logged out, please try again",
            duration: 1000
          })
          .present();
      } else {
        this.storage.get("remeberUserId").then(val => {
          //console.log('remeberUserId is', val);
          this.remeberUserId = val;
          //console.log("this.remeberUserId "+this.remeberUserId);
          this.storage.get("userId").then(val => {
            //console.log('userId is', val);
            this.userId = val;
            //console.log("this.userId "+this.userId);
            this.storage.clear();
            this.fn1575973305();
            this.storage.set("intro-done", true);
          });
        });
        // this.fn1575973195();
        this.toastCtrl
          .create({
            message: "Logged out successfully",
            duration: 1000
          })
          .present();
        this.navCtrl.setRoot(SelectionPage);
        // window.location.reload();
        //this.events.publish('set')
        // this.rootPage = SelectionPage;
      }
    } else {
      loggedOut = await this.logoutApp();
      if (!loggedOut) {
        this.toastCtrl
          .create({
            message: "Cannot logged out, please try again",
            duration: 1000
          })
          .present();
      } else {
        // this.fn1575973195();
        this.storage.get("remeberUserId").then(val => {
          //console.log('remeberUserId is', val);
          this.remeberUserId = val;
          //console.log("this.remeberUserId "+this.remeberUserId);
          this.storage.get("userId").then(val => {
            //console.log('userId is', val);
            this.userId = val;
            //console.log("this.userId "+this.userId);
            this.storage.clear();
            this.fn1575973305();
            this.storage.set("intro-done", true);
          });
        });
        this.toastCtrl
          .create({
            message: "Logged out successfully",
            duration: 1000
          })
          .present();
        // window.location.reload();
        this.navCtrl.setRoot(SelectionPage);
        //  this.rootPage = SelectionPage;
      }
    }
    // else if(page.title=='Switch Company'){
    //  AppState.MenuEnabled=true;
    //  AppState.IsDashboard=true;
    //  this.rootPage = page.component;
    // }
    // else if(page.title=='My Profile'){
    //  AppState.IsDashboard=false;
    //  this.rootPage = page.component;
    // }
    // else {
    //  AppState.IsDashboard=true;
    //  this.rootPage = page.component;
    // }
  }
  async logoutApp() {
    var request = {
      DeviceCode: AppState.DeviceToken,
      UserId: AppState.UserCred["userid"]
    };
    var response = await this.apiProvider
      .Post(AppConst.LOGOUT, request)
      .toPromise();
    if (response != null && response["status"] == true) {
      AppState.UserCred["frienduserid"] = "0";
      return true;
    }
    if (!response["status"] && !response["devicecode"]) {
      return true;
    }
    return false;
  }
  /**
   *
   */
  async getMonthAppointments() {
    var request = {
      StartDate: "1-1-2019", //this.datePipe.transform(this.currentMonthDates, 'yyyy-MM-dd'),
      EndDate: "31-1-2019", //this.datePipe.transform(this.currentMonthDates[this.currentMonthDates.length - 1], 'yyyy-MM-dd'),
      CompayId: AppState.UserCred.currentCompanyId
    };
    if (AppState.IsMember) request["MemberId"] = AppState.UserCred.userid;
    else request["ProviderId"] = AppState.UserCred.userid;
    let response = await this.apiProvider
      .Post(AppConst.GET_APPOINTMENTS, request)
      .toPromise();
    if (
      response != null &&
      response.hasOwnProperty("records") &&
      response["records"] != null &&
      response["records"].length > 0
    ) {
      this.monthAppointments = response["records"].filter(
        x => x.type == "appointment" || (x.type == "request" && x.status != "9")
      );
      this.monthAppointments.forEach(element => {
        if (element.missed == true) {
          this.MissedApppointments.push(element);
        }
        if (element.status == 5) {
          this.DoneAppointments.push(element);
        }
        if (element.status == 1 && element.missed != true) {
          this.UpcommingAppointments.push(element);
          this.isAppointmentsEmpty =
            this.UpcommingAppointments.length == null ||
            this.UpcommingAppointments.length == 0;
        }
        let date = new Date(element["start"]);
        let classId = date.getMonth().toString() + date.getDate().toString();
        let elements = document.getElementsByName(classId);
        if (elements != null && elements.length > 0) {
          let div = elements.item(0);
          div.style.height = "60px";
          div.style.overflowY = "scroll";
          if (div != null) {
            let innerDiv = document.createElement("div");
            innerDiv.style.verticalAlign = "middle";
            var apptDiv = document.createElement("div");
            apptDiv.style.height = "auto";
            apptDiv.style.padding = "5px";
            apptDiv.style.marginTop = "5px";
            if (element.status == 1 && element.missed)
              apptDiv.className = "appt-miss-div";
            else apptDiv.className = "appt-confirm-div";
            apptDiv.addEventListener("click", () => {
              // this.showAppointmentPopup(element);
            });
            let service = document.createElement("div");
            service.className = "appt-p";
            service.style.fontSize = "8px";
            service.innerText = "";
            innerDiv.appendChild(service);
            apptDiv.appendChild(innerDiv);
            div.appendChild(apptDiv);
          }
        }
      });
      this.loader.dismiss();
      //console.log(this.monthAppointments)
      //console.log(this.MissedApppointments)
      //console.log(this.DoneAppointments)
      //console.log(this.UpcommingAppointments)
      //     for(let i in this.monthAppointments){
      //     if(this.monthAppointments[i].start >this.todayDate )
      //     {
      // this.UpcommingDate.push(this.monthAppointments[i])
      //     }
      //     console.log(this.UpcommingDate)
      //   }
    } else {
      this.loader.dismiss();
    }
  }
  ViewAll() {
    this.navCtrl.push("AppointmentsPage");
  }
  Upcomming() {
    this.navCtrl.push("UpcomingappointmentPage", this.UpcommingAppointments);
  }
  AppointmentsHistory() {
    this.navCtrl.push("AppointmenthistoryPage", {
      Done: this.DoneAppointments,
      Missed: this.MissedApppointments,
      header: "Done"
    });
  }
  AppointmentsHistory1() {
    this.navCtrl.push("AppointmenthistoryPage", {
      Done: this.DoneAppointments,
      Missed: this.MissedApppointments,
      header: "Missed"
    });
  }
  /**
   * Get all the notifications
   */
  async getNotifications() {
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
        console.log(error);
      }
    );
    console.log(this.Notifications);
  }
  Friends() {
    this.navCtrl.push("FamilyfriendsPage");
  }
  Notification() {
    console.log("in");
    this.navCtrl.push("MyaccountnotificationPage");
  }
  Myreview() {
    this.navCtrl.push("MyaccountReviewPage");
  }
  MYProfile() {
    this.navCtrl.push("ProfilePage");
  }
  Subscriptionplan() {
    this.navCtrl.push("SubscriptionplanPage");
  }
  Chat() {
    this.navCtrl.push("ChatPage");
  }
  Home() {
    this.navCtrl.push("HomePage");
  }
  Goback() {
    var publishMsg = AppState.IsMember ? "memberloggedin" : "providerloggedin";
    this.events.publish(publishMsg);
    this.navCtrl.pop();
    //  this.navCtrl.setRoot(HomePage)
    // this.navCtrl.push(page.component);
    // this.navCtrl.pop();
  }
  fn1575973195() {
    //get value before cleaning
    console.log("inside fn1575973195");
    this.storage.get("remeberUserId").then(val => {
      //console.log('remeberUserId is', val);
      this.remeberUserId = val;
      //console.log("this.remeberUserId "+this.remeberUserId);
    });
    this.storage.get("userId").then(val => {
      //console.log('userId is', val);
      this.userId = val;
      //console.log("this.userId "+this.userId);
    });
  }
  fn1575973305() {
    //set value after cleaning
    //console.log('inside fn1575973305');
    this.storage.set("remeberUserId", this.remeberUserId).then(() => {
      //console.log("this.remeberUserId "+this.remeberUserId);
    });
    this.storage.set("userId", this.userId).then(() => {
      //console.log("this.userId "+this.userId);
    });
  }
}
