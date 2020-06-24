import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  DateTime,
  ToastController
} from "ionic-angular";
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DatePipe } from "@angular/common";
import { filter } from "rxjs/operator/filter";
import { AppState } from "../../AppStates";
import { AppConst } from "../../AppConst";
import { ApiProvider } from "../../providers/api/api";
import { MemberCheckinScuccessPage } from "../member-checkin-scuccess/member-checkin-scuccess";
import "rxjs/add/observable/interval";
import { Observable } from "../../../node_modules/rxjs/Observable";
//import { MemberCheckedinSuccessPage } from '../member-checkedin-success/member-checkedin-success';

/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-qrcode",
  templateUrl: "qrcode.html"
})
export class QrcodePage {
  title: string;
  checkInText: string;
  isCheckout: boolean = false;
  checkInTime: any;
  qrCode: any;
  bgColor: any;
  data: any;
  statusChecked: boolean = false;
  sub: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private datePipe: DatePipe,
    private apiProvider: ApiProvider,
    private toastCtrl: ToastController
  ) {
    this.data = navParams.data;
    this.sub = Observable.interval(1000).subscribe(val => {
      console.log("called");

      this.checkForAppointmentStatus();
    });
  }

  ionViewDidEnter() {
    if (this.data.appointment.status == "4") {
      this.bgColor = "#FDB913";
      this.checkInText = "Scan the QR code to check out";
      this.title = "Check Out";
      this.isCheckout = true;
    } else {
      this.bgColor = "#BFD730";
      this.checkInText = "Scan the QR code to check in";
      this.title = "Check In";
    }
    this.checkInTime =
      (this.data.appointment.status == "4" ? "Check Out" : "Check In") +
      " for " +
      this.data.appointment.service +
      " at " +
      this.datePipe.transform(new Date(), "HH:mm");
    this.generateQrCode();
    if (this.data.appointment != null && !this.statusChecked) {
      this.checkForAppointmentStatus();
    }
  }

  ionViewDidLeave() {
    console.log("view leave");
    this.sub.unsubscribe();
  }

  /**
   * Generate qr code
   */
  async generateQrCode() {
    let appoitnmentId = this.data.appointment.id.split("_");
    var checkinRequest = {
      Action: "generateqrcode",
      AppointmentId: appoitnmentId[appoitnmentId.length - 1],
      MemberId: AppState.UserCred.userid,
      DateTime: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      Type: this.data.appointment.status == "4" ? "checkout" : "checkin",
      CompanyId: this.data.appointment.companyid,
      ApptSource: this.data.appointment.apptsource
    };

    let response = await this.apiProvider
      .Post(AppConst.Get_QR_CODE, checkinRequest)
      .toPromise();
    if (response != null && response["status"]) {
      this.qrCode = response["qrcode"];
      this.checkForAppointmentStatus();
    }
  }

  /**
   * Check for appointment
   */
  async checkForAppointmentStatus() {
    console.log("inside checkForAppointmentStatus");
    // console.log(this.data)
    let appointmentIds = this.data.appointment.id.split("_");
    let request = {
      StartDate: this.datePipe.transform(
        new Date(this.data.appointment.start),
        "yyyy-MM-dd"
      ),
      EndDate: this.datePipe.transform(
        new Date(this.data.appointment.end),
        "yyyy-MM-dd"
      ),
      MemberId: AppState.UserCred.userid,
      AppointmentId: appointmentIds[appointmentIds.length - 1]
    };
    if (!AppState.IsWemaLife) request["companyid"] = "1";
    let response = await this.apiProvider
      .post(AppConst.GET_APPOINTMENTS, request)
      .toPromise();
    console.log("response");
    // console.log(JSON.stringify(response));
    if (
      response != null &&
      response.hasOwnProperty("records") &&
      response["records"]
    ) {
      let appt = response["records"].filter(
        x => x.id == this.data.appointment.id
      )[0];
      console.log(appt);
      if (appt != null && appt.status == "4" && this.data.type == "checkin") {
        this.toastCtrl
          .create({
            message: "Checked in successfully",
            duration: 2000
          })
          .present();

        // this.navCtrl.push('MemberCheckinScuccessPage' , this.data.appointment);
        this.navCtrl.setRoot(
          "MemberCheckinScuccessPage",
          this.data.appointment
        );
      } else if (
        appt != null &&
        appt.status == "5" &&
        this.data.type == "checkout"
      ) {
        this.toastCtrl
          .create({
            message: "Checked out successfully",
            duration: 2000
          })
          .present();
        this.statusChecked = true;
        //    this.navCtrl.push('MemberCheckinScuccessPage' , this.data.appointment);
        this.navCtrl.setRoot(
          "MemberCheckinScuccessPage",
          this.data.appointment
        );
      } else {
      }
    }
  }
}
