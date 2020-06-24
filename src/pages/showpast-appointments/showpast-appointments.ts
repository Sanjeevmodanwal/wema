import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from "ionic-angular";
import { AppState } from "../../AppStates";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import { DatePipe } from "../../../node_modules/@angular/common";
import { Helper } from "../../helpers/helper";
import {
  NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult,
  NativeGeocoderOptions
} from "@ionic-native/native-geocoder";
import { VisitReportPopUpPage } from "../visit-report-pop-up/visit-report-pop-up";
/**
 * Generated class for the ShowpastAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-showpast-appointments",
  templateUrl: "showpast-appointments.html"
})
export class ShowpastAppointmentsPage {
  pastVisits: any;
  members = [];
  selectedmember: any = "";
  showfilter: boolean = false;
  endTimes(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  Appointments1: any;
  date: string;
  UpcommingAppointment = [];
  doneAppointment = [];
  Done: number;
  Appointmentdetails: any[];
  upAppointment: number;
  monthHeader: any;
  private flag: boolean = true;
  constructor(
    private nativeGeocoder: NativeGeocoder,
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private datePipe: DatePipe,
    private apiProvider: ApiProvider,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShowpastAppointmentsPage");
    // this.getMonthAppointments()
  }
  ionViewDidEnter() {
    let date = new Date(Date.now());
    let TodayDate = new Date(date.getMonth());

    var filter = {
      TodayDate: TodayDate,

      Today: new Date(this.datePipe.transform(TodayDate, "yyyy-MM-dd"))
    };
    this.getPastVisits(filter);
  }

  logRange($event) {
    var filter = "";
    console.log("ionChange emitted: ", this.selectedmember);
    this.getPastVisits(filter);
  }

  async checkAndAdd(id, name) {
    var found = this.members.some(function(el) {
      return el.membername === name;
    });
    if (!found) {
      this.members.push({ id: id, membername: name });
    }
  }
  async getPastVisits(filter: any) {
    var request = {
      //companyid: AppState.UserCred.currentCompanyId
    };
    if (AppState.IsMember) request["memberid"] = AppState.UserCred.userid;
    else request["providerid"] = AppState.UserCred.userid;

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

        if (this.selectedmember != "") {
          if (this.selectedmember === element["membername"]) {
            element["doneforthismember"] = true;
          } else {
            element["doneforthismember"] = false;
          }
        } else {
          element["doneforthismember"] = true;
        }

        this.checkAndAdd(element["memberid"], element["membername"]);
      });
    }
    //this.checkAndAdd('5','Narendra Singh');

    console.log(this.pastVisits);
  }

  async getMonthAppointments() {
    var request = {
      CompayId: AppState.UserCred.currentCompanyId,
      enddate: "31-1-2019",
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
      console.log(newdate);
      console.log(date);
      console.log(this.Appointments1[i].date);
      if (
        this.Appointments1[i].date >= newdate &&
        this.Appointments1[i].missed == false
      ) {
        console.log(this.Appointments1[i]);
        this.UpcommingAppointment.push(this.Appointments1[i]);
      } else if (this.Appointments1[i].status == "4") {
        console.log("in status", this.Appointments1[i]);
        this.UpcommingAppointment.push(this.Appointments1[i]);
      } else if (this.Appointments1[i].status == 5) {
        this.doneAppointment.push(this.Appointments1[i]);
      }
      this.Done = this.doneAppointment.length;
      this.upAppointment = this.UpcommingAppointment.length;
      this.Appointmentdetails = this.UpcommingAppointment;
      console.log(this.Appointmentdetails);
      this.monthHeader = Helper.getFullMonth(0);
      console.log(this.endTimes);
    }
  }

  getAddress() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder
      .reverseGeocode(
        AppState.Location.latitude,
        AppState.Location.longitude,
        options
      )
      .then((result: NativeGeocoderReverseResult[]) => {
        console.log(result);
        console.log(result[0].countryName);
        AppState.Country = result[0].countryName;
      })

      .catch((error: any) => console.log(error));

    this.nativeGeocoder
      .forwardGeocode("Berlin", options)
      .then((coordinates: NativeGeocoderForwardResult[]) =>
        console.log(
          "The coordinates are latitude=" +
            coordinates[0].latitude +
            " and longitude=" +
            coordinates[0].longitude
        )
      )
      .catch((error: any) => console.log(error));
  }

  viewVisitReport(report: any) {
    console.log('inside viewVisitReport');
    console.log('appState: '+JSON.stringify(AppState));
    console.log(report);
    //this.navCtrl.push(VisitReportPopUpPage,{data:report});
    report["fromPage"] = "showpast-appointments";
    var pastVisitsReportPopUpPage = this.modalCtrl.create(
      "VisitReportPopUpPage",
      report
    );
    pastVisitsReportPopUpPage.present();
    pastVisitsReportPopUpPage.onDidDismiss(data => {});
  }
}
