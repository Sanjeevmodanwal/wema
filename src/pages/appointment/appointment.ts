import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ModalController,
  ToastController,
  Events,
  Modal
} from "ionic-angular";
import { AppState } from "../../AppStates";
import { ApiProvider } from "../../providers/api/api";
import { DatePipe } from "@angular/common";
import { CheckinPage } from "../checkin/checkin";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { AppConst } from "../../AppConst";
import { ProviderCheckinSuccessPage } from "../provider-checkin-success/provider-checkin-success";
import { Helper } from "../../helpers/helper";
import { VisitReportPopUpPage } from "../visit-report-pop-up/visit-report-pop-up";
import { SumupPage } from '../sumup/sumup';
/**
 * Generated class for the AppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-appointment",
  templateUrl: "appointment.html"
})
export class AppointmentPage {
  data: any;
  pastVisits: any;
  isPastAppointmentDoneEmpty: boolean = true;
  public appState = AppState;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private datePipe: DatePipe,
    private barcodeScanner: BarcodeScanner,
    private apiProvider: ApiProvider,
    public alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    //console.log(this.navParams.data)
    this.data = this.navParams.data;
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad AppointmentPage');
    this.createCheckintimer();
    this.getPastVisits();
  }
  /**
   * Create checkin timer
   */
  createCheckintimer() {
    AppState.Second = 5;
    AppState.CheckinTimer = "00:00";
    this.startTimer();
  }
  /**
   * Start timer
   */
  startTimer() {
    setTimeout(x => {
      if (AppState.Second < 0) return;
      AppState.Second -= 1;
      if (AppState.Second >= 0) {
        this.timerElapsed();
        this.startTimer();
      }
    }, 1000);
  }
  /**
   * Timer elapsed
   */
  timerElapsed() {
    var minutes = Math.floor(AppState.Second / 60);
    var seconds = AppState.Second % 60;
    // let hours = Math.floor((AppState.Second  % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //console.log(hours)
    var formattedMinute = minutes.toString();
    var formattedSecond = seconds.toString();
    if (formattedMinute.length == 1) formattedMinute = "0" + formattedMinute;
    if (formattedSecond.length == 1) formattedSecond = "0" + formattedSecond;
    AppState.CheckinTimer = formattedMinute + ":" + formattedSecond;
    // if (minutes == 0 && seconds == 0)
    // this.checkin();
  }
  checkin() {
    this.navCtrl.push("CheckinPage", this.data);
  }
  /**
   * CheckIn
   * @param appointment
   */
  checkIn(appointment: any) {
    //console.log('incheck in page')
    if (appointment != null) {
      if (
        appointment.status == "5" ||
        appointment.status == "3" ||
        appointment.status == "8"
      )
        return;
      this.barcodeScanner.scan().then(
        data => {
          if (data != null) {
            let appointmentIds = appointment.id.split("_");
            let scanResult = data.text.split("||");
            if (scanResult[1] == appointmentIds[appointmentIds.length - 1]) {
              if (scanResult[scanResult.length - 1] == "true") {
                this.getReasonForLatePopup(scanResult, appointment, "early");
              } else if (scanResult[scanResult.length - 2] == "true") {
                this.getReasonForLatePopup(scanResult, appointment, "late");
              } else {
                this.executeCheckIn(scanResult, appointment, null, null);
              }
            } else {
              this.toastCtrl
                .create({
                  message:
                    "Mismatched " + appointment.status == "4"
                      ? "check out"
                      : "check in",
                  duration: 2000
                })
                .present();
            }
          }
        },
        err => {
          this.toastCtrl
            .create({
              message: "something went wrong",
              duration: 2000
            })
            .present();
        }
      );
    }
  }
  /**
   * Late Reasong popup
   */
  getReasonForLatePopup(scanResult: any, appointment: any, type: string) {
    var checkinType = appointment.status == "4" ? "check out" : "check in";
    var title = "Give reason for " + type + " " + checkinType;
    let checkinReasonPopup = this.modalCtrl.create(Modal, { title: title });
    checkinReasonPopup.onDidDismiss(reason => {
      if (reason != null)
        this.executeCheckIn(scanResult, appointment, reason, type);
    });
    checkinReasonPopup.present();
  }
  /**
   * Execute checkin
   */
  async executeCheckIn(
    scanResult: any,
    appointment: any,
    reason: string,
    checkinType: any
  ) {
    let appointmentIds = appointment.id.split("_");
    let response;
    if (appointment.status == "4") {
      let request = {
        Action: "end",
        AppointmEntId: appointmentIds[appointmentIds.length - 1],
        EndTime: scanResult[3],
        CompanyId: appointment.companyid,
        ApptSource: appointment.apptsource
      };
      if (checkinType == "early") request["EarlyReason"] = reason;
      else if (checkinType == "late") {
        request["LateReason"] = reason;
      }
      response = await this.apiProvider
        .Post(AppConst.CHECK_INOUT, request)
        .toPromise();
    } else {
      let request = {
        Action: "start",
        AppointmEntId: scanResult[1],
        ProviderId: AppState.UserCred.userid,
        StartTime: scanResult[3],
        CompanyId: appointment.companyid,
        ApptSource: appointment.apptsource
      };
      if (checkinType == "early") request["EarlyReason"] = reason;
      else if (checkinType == "late") {
        request["LateReason"] = reason;
      }
      response = await this.apiProvider
        .Post(AppConst.CHECK_INOUT, request)
        .toPromise();
    }
    if (response != null && response["status"])
      this.navCtrl.push(ProviderCheckinSuccessPage, appointment);
  }
  async getPastVisits() {
    var request = {
      //companyid: AppState.UserCred.currentCompanyId
    };
    if (AppState.IsMember) request["memberid"] = AppState.UserCred.userid;
    else request["providerid"] = AppState.UserCred.userid;
    //console.log(request);
    let response = await this.apiProvider
      .Post(AppConst.GET_PAST_VISITS, request)
      .toPromise();
    if (
      response != null &&
      response.hasOwnProperty("records") &&
      response["records"].length > 0
    ) {
      this.pastVisits = response["records"];
      this.pastVisits.forEach(element => {
        var date = new Date(element["starttime"]);
        var month = Helper.getFullMonth(date.getMonth());
        element["formattedDate"] = date.getDate() + "-" + month;
        if (
          this.data.membername == element["membername"] &&
          this.data.providerid == element["providerid"]
        ) {
          element["doneforthismember"] = true;
          this.isPastAppointmentDoneEmpty = false;
        } else {
          element["doneforthismember"] = false;
        }
      });
      //console.log(this.pastVisits)
    }
    //console.log(this.pastVisits)
  }
  viewVisitReport(report: any) {
    //console.log(report);
    //this.navCtrl.push(VisitReportPopUpPage,{data:report});
    var pastVisitsReportPopUpPage = this.modalCtrl.create(
      "VisitReportPopUpPage",
      report
    );
    pastVisitsReportPopUpPage.present();
    pastVisitsReportPopUpPage.onDidDismiss(data => {});
  }
  chargeNow(){
    this.navCtrl.push("SumupPage", this.data);
  }
}
