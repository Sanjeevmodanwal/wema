import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController,
  Events
} from "ionic-angular";
import {
  InAppBrowser,
  InAppBrowserEvent,
  InAppBrowserOptions
} from "@ionic-native/in-app-browser";
import { AppState } from "../../AppStates";
import { DatePipe } from "@angular/common";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import { Helper } from "../../helpers/helper";
import { VisitReportPopUpPage } from "../visit-report-pop-up/visit-report-pop-up";
import { VisitCommentPopUpPage } from "../visit-comment-pop-up/visit-comment-pop-up";
import { SelectionPage } from "../selection/selection";
import { Storage } from "@ionic/storage";
import { ProviderAppointmentsPage } from "../provider-appointments/provider-appointments";
import { VisithistoryPage } from "../visithistory/visithistory";
import { EmaliPage } from "../emali/emali";
import { CheckinPage } from "../checkin/checkin";
//import { AppointmentpagePage } from '../appointmentpage/appointmentpage';
import { AppointmentPage } from "../appointment/appointment";
import { ExpensesPage } from "../expenses/expenses";
import { EmergencyAlarmPage } from "../emergency-alarm/emergency-alarm";
import { AddcompanyPage } from "../addcompany/addcompany";
import { MileagePage } from "../mileage/mileage";
import { AppointmentsPage } from "../appointments/appointments";
import { ProviderReportPage } from "../provider-report/provider-report";
import { ProfilePage } from "../profile/profile";
import { NotificationPage } from "../notification/notification";
import { UpdateAvailibilityPage } from "../update-availibility/update-availibility";
import { ShowpastAppointmentsPage } from "../showpast-appointments/showpast-appointments";
import { MemberAccountPage } from "../member-account/member-account";
import { ChatPage } from "../chat/chat";
import { RouteMapPage } from "../route-map/route-map";
import { PendingVisitReportPage } from "../pending-visit-report/pending-visit-report";
import { EmailVerifyPopupPage } from "../email-verify-popup/email-verify-popup";
import { PopupModalPage } from "../popup-modal/popup-modal";
import { MoneyearnedPage } from "../moneyearned/moneyearned";
/**
 * Generated class for the ProviderDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-provider-dashboard",
  templateUrl: "provider-dashboard.html"
})
export class ProviderDashboardPage {
  ProfileName: string;
  ProfilePic: any;
  Company: any;
  rootPage: any;
  pastVisits: any;
  TodayDate: string;
  items: any;
  public appState = AppState;
  loginStatus: boolean;
  Appointments: any;
  TodayHeader: string;
  UpcommingAppointment = [];
  upAppointment: any;
  upAppointmentCounter: any = 0;
  Appointmentdetails: any[];
  endTimes: any;
  monthHeader: string;
  doneAppointment = [];
  Done: number;
  moneyEarned: string;
  isAppointmentsEmpty: boolean = true;
  isVisitreportEmpty: boolean = true;
  Currency: any;
  date: string;
  Notifications: Array<{
    Title: string;
    Message: string;
    Time: string;
    id: string;
    Status: string;
  }> = [];
  Appointments1: any;
  pastAppointments: any;
  options: InAppBrowserOptions = {
    location: "yes", //Or 'no'
    hidden: "no", //Or  'yes'
    clearcache: "yes",
    clearsessioncache: "yes",
    zoom: "yes", //Android only ,shows browser zoom controls
    hardwareback: "yes",
    mediaPlaybackRequiresUserAction: "no",
    shouldPauseOnSuspend: "no", //Android only
    closebuttoncaption: "Close", //iOS only
    disallowoverscroll: "no", //iOS only
    toolbar: "yes", //iOS only
    enableViewportScale: "no", //iOS only
    allowInlineMediaPlayback: "no", //iOS only
    presentationstyle: "pagesheet", //iOS only
    fullscreen: "yes" //Windows only
  };
  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private datePipe: DatePipe,
    private apiProvider: ApiProvider,
    private modalCtrl: ModalController,
    private events: Events,
    private storage: Storage,
    private inAppBrowser: InAppBrowser
  ) {
    console.log('constructor');
    this.ProfileName =
      AppState.UserCred["firstname"] + " " + AppState.UserCred["lastname"];
    this.ProfilePic =
      AppState.UserCred["avatar"] == null || AppState.UserCred["avatar"] == ""
        ? "assets/imgs/userred.png"
        : AppState.UserCred["avatar"];
    this.Company = AppState.UserCred.profile[0]["companyname"];
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad helo',AppState.IsMember);
   // this.rootPage = MemberAccountPage;
    //  this.TodayHeader = "Today's Appointments - " + Helper.getTodayFormattedDate();
    // console.log(this.TodayHeader, AppState.CurrentCompany.currency);
    //this.Currency = AppState.CurrentCompany.currency;
    // console.log(this.ProfileName, this.ProfilePic, this.Company);
    // console.log("ionViewDidLoad ProviderDashboardPage");
    this.ProviderReport();
    this.getAppointments();
    this.getNotifications();
    this.getMonthAppointments();
    if (AppState.IsMember) {
      console.log("redirected at member dashboard page");
    
      //this.navCtrl.push("MemberAccountPage");
     
    }
  }
  /*doRefresh(refresher) {
    this.ionViewDidLoad()
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }*/
  moneyEarnedPage() {
    console.log('moneyEarnedPage');
    this.navCtrl.push("MoneyearnedPage");
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.verifyEmail();
    let date = new Date(Date.now());
    let TodayDate = new Date(date.getMonth());
    var filter = {
      TodayDate: TodayDate,
      Today: new Date(this.datePipe.transform(TodayDate, "yyyy-MM-dd"))
    };
    this.getPastVisits(filter);
  }
  /**
   * Verify provider's email
   */
  async verifyEmail() {
    console.log('verifyEmail');
    // this.showEmailPopup();
    let request = {
      apikey: AppState.UserCred.key,
      UserId: AppState.UserCred.userid
    };
    let response = await this.apiProvider
      .Post(AppConst.VERIFY_EMAIL, request)
      .toPromise();
    if (response != null && response["status"]) {
      if (response["verifications"] != null) {
        AppState.ManagerVerified = response["verifications"]["managerverified"];
      }
      AppState.EmailVerified = response["emailalert"];
      let filteredCompanies = response["companies"].filter(
        x => x.companyid == AppState.UserCred.currentCompanyId
      );
      if (filteredCompanies != null && filteredCompanies.length > 0) {
        let company = filteredCompanies[0];
        if (company != null && !company.availability) {
          AppState.UserCred["availability"] = false;
          AppState.IsAvailabilityEdit = true;
        } else {
          AppState.UserCred["availability"] = true;
          AppState.IsAvailabilityEdit = false;
        }
      }
      if (response["forcelogout"]) {
        this.forceLogout();
        return false;
      } else if (response["emailalert"] == false && AppState.IsMember) {
        this.showEmailPopup();
        return false;
      }
      return true;
    }
    return true;
  }
  /**
   * Show email verification email popup
   */
  showEmailPopup() {
    console.log('showEmailPopup');
    let emailVerifyPopup = this.modalCtrl.create("EmailVerifyPopupPage", null, {
      enableBackdropDismiss: false
    });
    emailVerifyPopup.onDidDismiss(data => {
      if (data != null) {
        if (data) {
          let emailVerified = this.verifyEmail();
          if (!emailVerified)
            this.toastCtrl
              .create({
                message: "Email not verified",
                duration: 2000
              })
              .present();
        }
      }
    });
    emailVerifyPopup.present();
  }
  async getPastVisits(filter: any) {
    console.log('getPastVisits');
    var request = {
      //companyid: AppState.UserCred.currentCompanyId
      companyid: AppState.UserCred.companyid
    };
    if (AppState.IsMember) request["memberid"] = AppState.UserCred.userid;
    else request["providerid"] = AppState.UserCred.userid;
    console.log(request);
    let response = await this.apiProvider
      .Post(AppConst.GET_PAST_VISITS, request)
      .toPromise();
    if (
      response != null &&
      response.hasOwnProperty("records") &&
      response["records"].length > 0
    ) {
      this.pastAppointments = response["totalrecord"];
      console.log("total pastAppointments: " + this.pastAppointments);
      this.pastVisits = response["records"];
      //this.upAppointment=this.pastVisits.length
      //this.isVisitreportEmpty = this.pastVisits.length == null || this.pastVisits.length == 0;
      this.pastVisits.forEach(element => {
        var date = new Date(element["starttime"]);
        var month = Helper.getShortMonth(date.getMonth());
        element["formattedDate"] = date.getDate() + "-" + month;
        if (element["providerreport"] == "") {
          element["visitpendingstatus"] = "true";
          this.isVisitreportEmpty = false;
        } else {
          element["visitpendingstatus"] = "false";
        }
        let showdateformat = element["date"];
        element["showdateformat"] = showdateformat;
        element["showstartdatetimeformat"] =
          showdateformat + " " + element["starttime"];
      });
    } else {
      this.isVisitreportEmpty = true;
      this.pastVisits = [];
    }
  }
  /**
   * View visit report
   * @param report
   */
  viewVisitReport(report: any) {
    console.log('viewVisitReport');
    // console.log(report);    
    report['fromPage']="provider-dashboard";
    var pastVisitsReportPopUpPage = this.modalCtrl.create(
      "VisitReportPopUpPage",
      report
    );
    pastVisitsReportPopUpPage.present();
    pastVisitsReportPopUpPage.onDidDismiss(data => {
      console.log(data);
      this.ionViewDidEnter();
    });
  }
  /**
   * Show commment popup
   * @param report
   */
  comment(report: any) {
    console.log('comment');
    console.log(report);
    var PastCommentPopUpPageModal = this.modalCtrl.create(
      "VisitCommentPopUpPage",
      report
    );
    PastCommentPopUpPageModal.present();
    PastCommentPopUpPageModal.onDidDismiss(data => {});
  }
  //   LogOut()
  // {
  //   this.openPage();
  // }
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
  //         this.toastCtrl.create({
  //           message: "Logged out successfully",
  //           duration: 1000
  //         }).present();
  //       //  this.loginStatus=false
  //       this.navCtrl.setRoot( SelectionPage)
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
  //         this.toastCtrl.create({
  //           message: "Logged out successfully",
  //           duration: 1000
  //         }).present();
  //         this.navCtrl.setRoot( SelectionPage)
  //       }
  //     }
  //   }
  // }
  /**
   * Force logout
   */
  async forceLogout() {
    console.log('forceLogout');
    this.logout();
    this.storage.clear();
    this.toastCtrl
      .create({
        message: "Logged out successfully",
        duration: 2000
      })
      .present();
    // this.events.publish('setRoot', SelectionPage);
    this.navCtrl.setRoot(SelectionPage);
  }
  /**
   * Logout from app
   */
  async logout() {
    console.log('logout');
    let request = {
      DeviceCode: AppState.DeviceToken,
      UserId: AppState.UserCred.userid
    };
    let response = await this.apiProvider.Post(AppConst.LOGOUT, request);
    if (response != null && response["status"]) return true;
    return false;
  }
  async ProviderReport() {
    console.log('ProviderReport');
    var request = {
      list: "moneyearned",
      UserId: AppState.UserCred["userid"],
      companyid: AppState.UserCred.companyid
      //     companyid:58,
      // providerid:362
    };
    var response = await this.apiProvider
      .Post(AppConst.providerReport, request)
      .toPromise();
    // console.log(response);
    // this.moneyEarned='0'
    if (response["records"] == 0) {
      this.moneyEarned = "0";
    } else {
      // console.log("eanig is done");
    }
  }
  providerAppointment() {
    console.log('providerAppointment');
    this.navCtrl.push("AppointmentsPage");
  }
  async getMonthAppointments() {
    console.log('getMonthAppointments');
    var request = {
      // StartDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      // EndDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      //  ProviderId: AppState.UserCred['userid'],
      // StartDate: this.datePipe.transform(this.currentMonthDates['0'], 'yyyy-MM-dd'),
      // EndDate: this.datePipe.transform(this.currentMonthDates[this.currentMonthDates.length - 1], 'yyyy-MM-dd'),
     // CompayId: AppState.UserCred.currentCompanyId,
      //companyid:null,
       CompayId: AppState.UserCred.companyid,
      enddate: "31-1-2019",
      //providerid: "289",
      startdate: "1-1-2019"
    };
    if (AppState.IsMember) request["MemberId"] = AppState.UserCred.userid;
    else request["ProviderId"] = AppState.UserCred.userid;
    let response = await this.apiProvider
      .Post(AppConst.ProviderAppointment, request)
      .toPromise();
    this.Appointments1 = response["records"];
    for (let i in this.Appointments1) {
      let date = new Date();
      let newdate = this.datePipe.transform(date, "dd-MM-yyyy");
      this.date = newdate;
      // console.log(newdate);
      // console.log(date);
      // console.log(this.Appointments1[i].date);
      if (
        this.Appointments1[i].date >= newdate &&
        this.Appointments1[i].missed == false
      ) {
        // console.log(this.Appointments1[i]);
        this.UpcommingAppointment.push(this.Appointments1[i]);
        //    this.endTimes=  this.datePipe.transform(this.Appointments[i].date,'dd-MM-yyyy')
        //  this.endTimes= this.Appointmentdetails[i].date.split('-')
      } else if (this.Appointments1[i].status == "4") {
        // console.log("in status", this.Appointments1[i]);
        this.UpcommingAppointment.push(this.Appointments1[i]);
      } else if (this.Appointments1[i].status == 5) {
        this.doneAppointment.push(this.Appointments1[i]);
      }
      this.Done = this.pastVisits.totalrecord;
      // console.log(this.Done)
      // console.log(this.UpcommingAppointment)
      this.upAppointment = this.UpcommingAppointment.length;
      this.Appointmentdetails = this.UpcommingAppointment;
      // console.log(this.Appointmentdetails);
      this.monthHeader = Helper.getFullMonth(0);
      // console.log(this.monthHeader)
      // console.log(this.endTimes);
      // this.getAppointments();
    }
    //   this.Appointments.forEach(element => {
    //     if (element.status == "4")
    //     element['checkInText'] = "Check-out";
    //   else if (element.status == "5")
    //     element['checkInText'] = "Completed";
    //   else if (element.status == "3" || element.status == "8")
    //     element['checkInText'] = "Cancelled";
    //   else
    //     element['checkInText'] = "Check-in";
    //     console.log(this.Appointments)
    // });
    // this.Appointments.forEach(element => {
    //   let date = new Date(element['start']);
    //   let classId = date.getMonth().toString() + date.getDate().toString();
    //   let elements = document.getElementsByName(classId);
    //   let status =element['status']
    //   console.log(status,element,classId,date)
    // });
  }
  /**
   * Get all the notifications
   */
  async getNotifications() {
    console.log('getNotifications');
    this.Notifications = [];
    var request = {
      userid: AppState.UserCred["userid"]
    };
    //var response = await this.apiProvider.Post(AppConst.GET_NOTIFICATIONS, request).toPromise();
    this.apiProvider.Post(AppConst.GET_NOTIFICATIONS, request).subscribe(
      response => {
        if (response != null) {
          for (let i in response) {
            if (response[i].status == 1) {
              var obj = JSON.parse(response[i]["message"]);
              this.Notifications.push({
                Title: obj["title"],
                Message: obj["message"],
                Time: response[i]["createddatetime"],
                id: response[i]["pushid"],
                Status: response[i]["status"]
              });
            }
          }
        }
      },
      error => {
        // console.log(error);
      }
    );
    // console.log(this.Notifications);
  }
  /**
   * Get today's appointments
   */
  async getAppointments() {
    console.log('getAppointments');
    var request = {
      StartDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      EndDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      ProviderId: AppState.UserCred["userid"]
    };
    if (!AppState.IsWemaLife)
      request["CompanyId"] = AppState.UserCred.currentCompany.companyid;
    var response = await this.apiProvider
      .Post(AppConst.GET_APPOINTMENTS, request)
      .toPromise();
    this.upAppointmentCounter = 0;
    if (response != null && response["records"].length > 0) {
      this.Appointments = response["records"].filter(
        x => x.status != "3" && x.type == "appointment" && x.status != "9"
      );
      this.isAppointmentsEmpty =
        this.Appointments.length == null || this.Appointments.length == 0;
      this.Appointments.forEach(element => {
        var date = new Date(element.start);
        var hours =
          date.getHours() > 12 ? date.getHours() - 12 : date.getHours(); //date.getHours().toString().length==1?date.getHours().toString()+'0':date.getHours();
        var minutes =
          date.getMinutes().toString().length == 1
            ? date.getMinutes().toString() + "0"
            : date.getMinutes();
        var meridian = date.getHours() > 12 ? "PM" : "AM";
        element["formattedStart"] = hours + ":" + minutes + " " + meridian;
        element["durationHrs"] = Math.ceil(
          Math.abs(
            new Date(element.start).getTime() - new Date(element.end).getTime()
          ) /
            (60 * 60 * 1000)
        );
        if (element.missed != true && element.status == "1") {
          this.upAppointmentCounter = this.upAppointmentCounter + 1;
        }
        if (element.status == "4") {
          element["checkInText"] = "Check-out";
          console.log(element);
          //   this.UpcommingAppointment.push(element)
        } else if (element.status == "5") element["checkInText"] = "Completed";
        else if (element.status == "3" || element.status == "8")
          element["checkInText"] = "Cancelled";
        else element["checkInText"] = "Check-in";
      });
      // console.log(this.Appointments);
    } else {
      this.isAppointmentsEmpty = true;
    }
  }
  visitHistoryPage() {
    console.log('visitHistoryPage');
    this.navCtrl.push("VisithistoryPage");
  }
  emailPage() {
    console.log('emailPage');
    this.navCtrl.push("EmaliPage");
  }
  Mileage() {
    console.log('Mileage');
    this.navCtrl.push("MileagePage");
  }
  providercheckin(deatail) {
    console.log('providercheckin');
    this.navCtrl.push("AppointmentPage", deatail);
  }
  Emergency() {
    console.log('Emergency');
    this.navCtrl.push("EmergencyAlarmPage");
  }
  addCompanyPage() {
    console.log('addCompanyPage');
    this.navCtrl.push("AddcompanyPage");
  }
  providerReportPage() {
    console.log('providerReportPage');
    this.navCtrl.push("ProviderReportPage");
  }
  expenseReportsPage() {
    console.log('expenseReportsPage');
    this.navCtrl.push("ExpensesPage");
  }
  myprofilePage() {
    console.log('myprofilePage');
    this.navCtrl.push("ProfilePage");
  }
  Notification() {
    console.log('Notification');
    this.navCtrl.push("NotificationPage");
  }
  UpdateAvailibility() {
    console.log('UpdateAvailibility');
    this.navCtrl.push("UpdateAvailibilityPage");
  }
  PastAppointments() {
    console.log('PastAppointments');
    this.navCtrl.push("ShowpastAppointmentsPage");
  }
  chat() {
    console.log('chat');
    this.navCtrl.push("ChatPage");
  }
  RouteMap() {
    console.log('RouteMap');
    if (AppState.Location == undefined) {
      this.navCtrl.push("EnableLocationPage");
    } else {
      var latitude = AppState.Location.latitude;
      var longitude = AppState.Location.longitude;
      if (
        latitude == "" ||
        longitude == "" ||
        latitude == null ||
        latitude == undefined
      ) {
        this.toastCtrl
          .create({
            message: "Provider location is not defined.",
            duration: 2000
          })
          .present();
      } else if (latitude != "" && longitude != "") {
        var web = this.inAppBrowser.create(
          "https://www.google.com/maps/search/?api=1&query=" +
            latitude +
            "," +
            longitude +
            "",
          "location=no"
        );
      }
    }
    //this.navCtrl.push(RouteMapPage)
  }
  pendingvisits() {
    console.log('pendingvisits');
    this.navCtrl.push("PendingVisitReportPage");
  }
  PopupModalPageopen() {
    console.log('PopupModalPageopen');
    this.navCtrl.push("PopupModalPage");
  }
  ionViewWillEnter(){
    console.log('ionViewWillEnter');
  }
  ionViewWillLeave(){
    console.log('ionViewWillLeave');
  }
  ionViewDidLeave(){
    console.log('ionViewDidLeave');
  }
  ionViewWillUnload(){
    console.log('ionViewWillUnload');
  }
}
