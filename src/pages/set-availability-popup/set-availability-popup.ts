import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { ViewController } from "../../../node_modules/ionic-angular/navigation/view-controller";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import { AppState } from "../../AppStates";
import { DatePicker } from "../../../node_modules/@ionic-native/date-picker";
/**
 * Generated class for the SetAvailabilityPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-set-availability-popup",
  templateUrl: "set-availability-popup.html"
})
export class SetAvailabilityPopupPage {
  Data: Object;
  classdata: string;
  buttonClicked: boolean = true;
  Date: Date;
  Select_Location: boolean = false;
  startTimedata: any;
  endTimedata: any;
  dayofWeek: any;
  clinicname: any;
  clinic_name: any;
  Slots = [1];
  availabilityData: any;
  in_clinic: any = 0;
  sendData: any;
  constructor(
    public navCtrl: NavController,
    private datePicker: DatePicker,
    private apiProvider: ApiProvider,
    private viewCtrl: ViewController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    console.log('inside SetAvailabilityPopupPage constructor');
    console.log(navParams.data);
    this.sendData = navParams.data;
    this.availabilityData = navParams.data;
    this.startTimedata = navParams.data.starttime;
    this.dayofWeek = navParams.data.dayofweek;
    // console.log(this.startTimedata);
    // console.log('this.availabilityData: '+ JSON.stringify(this.availabilityData));
  }
  ionViewDidLoad() {
    console.log('inside SetAvailabilityPopupPage ionViewDidLoad');
    this.getClinicListpage();
  }
  cancel() {
    console.log('inside SetAvailabilityPopupPage cancel');
    this.viewCtrl.dismiss();
  }
  async update() {
    console.log('inside SetAvailabilityPopupPage update');
    let request = {
      action: "U",
      companyid:this.availabilityData.companyid,
      providerid: (this.availabilityData.createdby)?this.availabilityData.createdby:this.availabilityData.updatedby,
      updatedby: (this.availabilityData.createdby)?this.availabilityData.createdby:this.availabilityData.updatedby,
      availabletimes: [
        {
          availabilityid: this.availabilityData.availabilityid,
          clinic_address_id: this.availabilityData.clinic_address_id,
          clinic_location: (this.availabilityData.clinic_location) ? this.availabilityData.clinic_location : 0,
          dayofweek: this.dayofWeek,
          starttime: this.startTimedata+':00',
          endtime: this.endTimedata+':00',
          home_clinic: this.in_clinic
        }
      ],      
    };

    console.log('inside update()');
    console.log(JSON.stringify(request));

    var response = await this.apiProvider
        .Post(AppConst.GET_PROVIDER_AVAILABILITY, request)
        .toPromise();
    if (response != null) {
      if (response["status"]) {
        this.toastCtrl
          .create({
            message: "Availability has been updated.",
            duration: 2000
          })
        .present();
      }
    }
    console.log('inside SetAvailabilityPopupPage viewCtrl dismiss: this.sendData: '+JSON.stringify(this.sendData)+ ' this.endTimedata: '+JSON.stringify(this.endTimedata));
    this.viewCtrl.dismiss(this.sendData, this.endTimedata);    
  }

  locationChange($event){
    console.log('inside SetAvailabilityPopupPage locationChange');
    // console.log($event);
  }

  Home(Home: any, $event) {
    console.log('inside SetAvailabilityPopupPage Home');
    // console.log(Home);
    this.clinicname = "0";
    this.Select_Location = false;
    // this.classdata=' background: #13a89e !important;border-radius: 5px; padding: 8.5px;   color: #fff !important;  font-size: 14px; font-weight: 500; text-decoration: none; font-family:Muli, sans-serif; border: none !important;'
    this.in_clinic = 0;
  }
  Clinic() {
    console.log('inside SetAvailabilityPopupPage Clinic');
    this.Select_Location = true;
    // console.log(this.clinic_name);
    this.clinicname = this.clinic_name;
    this.in_clinic = 1;
  }
  ChooseDate() {
    console.log('inside SetAvailabilityPopupPage ChooseDate');
    this.buttonClicked = false;
  }
  chooseWeek() {
    console.log('inside SetAvailabilityPopupPage chooseWeek');
    this.buttonClicked = true;
  }
  async getClinicListpage() {
    console.log('inside SetAvailabilityPopupPage getClinicListpage');
    var filters = [
      {
        fieldname: "provider_id",
        fieldvalue: AppState.UserCred.userid,
        operators: "Equal"
      }
      // { fieldname: "duration", fieldvalue: this.searchData.duration.slice(' ')['0'], operators: "Equal" }
    ];
    var request = {
      //  app: true,
      //auth: true,
      filter: filters,
      //date: "2018-10-30",
      filterproperty: {
        offset: 0,
        recordlimit: 500,
        orderby: "id",
        dir: "DESC"
      },
      companyid: AppState.UserCred.companyid,
      companyno: AppState.UserCred.companyno,
      login_Userid: AppState.UserCred.userid,
      sourceapi: "wemalife"
      //  MemberId: AppState.UserCred.userid,
    };
    var response = await this.apiProvider
      .Post(AppConst.clinic, request)
      .toPromise();
    this.Data = response["records"];
  }
  toggleAccordion1() {
    console.log('inside SetAvailabilityPopupPage toggleAccordion1');
    this.datePicker
      .show({
        date: new Date(),
        mode: "date",
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
      })
      .then(
        date => {
          // console.log("Got date: ", date);
          this.Date = date;
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }
  AddSlot() {
    console.log('inside SetAvailabilityPopupPage AddSlot');
    this.Slots.push(1);
  }
}
