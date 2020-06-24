import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ToastController,
  AlertController,
  App,
  Item
} from "ionic-angular";
//import { AvailabilityPopupPage } from '../availability-popup/availability-popup';
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import { AppState } from "../../AppStates";
import { getLocaleDayNames } from "@angular/common";
import { Helper } from "../../helpers/helper";
import { SetAvailabilityPopupPage } from "../set-availability-popup/set-availability-popup";
import { duration } from "../../../node_modules/moment";
import { ProviderDashboardPage } from "../provider-dashboard/provider-dashboard";

//import { ProviderAvailabilityPopupPage } from '../provider-availability-popup/provider-availability-popup';
/**
 * Generated class for the UpdateAvailibilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-update-availibility",
  templateUrl: "update-availibility.html"
})
export class UpdateAvailibilityPage {
  availabilities: any;
  availability: any;
  data: any;
  provider: any;
  time: string;
  currentNavigatedDateWeek: Date;
  currentNavigatedDateMonth: Date;
  Companyid: any;
  row = 0;
  column = 1;
  response: any;
  currentMonthDates = [];
  ProviderId: any;
  currentDate = new Date();
  CompanyClinicId: any;
  ClinicAddressid: any;
  monthHeader: string;
  weekDates: any[];
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    public modalCtrl: ModalController
  ) {
    console.log("inside UpdateAvailibilityPage constructor");
    this.currentNavigatedDateMonth = this.currentDate;
    this.currentNavigatedDateWeek = this.getCurrentNavigatedDateWeek();
    this.currentNavigatedDateMonth = this.currentDate;
    this.getSavedAvailabilities();
  }
  // ionViewDidLoad() {
  //   //console.log(this.currentDate)
  //   this.getSavedAvailabilities();
  //   this.getClinicListpage();
  //   setTimeout(x => {
  //     this.getMonthDates();
  //   }, 1000);
  // }
  // ionViewDidEnter() {
  //   this.getWeekDays();
  //   this.getSavedAvailabilities();
  //   this.getClinicListpage();
  //   setTimeout(x => {
  //     this.getMonthDates();
  //   }, 1000);
  // }
  /**
   * Show Availability popup to set time
   * @param arg
   */
  async showAvailabilityPopup(arg: any) {
    console.log("inside UpdateAvailibilityPage showAvailabilityPopup");
    console.log("arg: " + arg);
    this.getClinicListpage();
    var time = arg.split("_");
    var dayOfWeek = parseInt(time[2]);
    var minute = parseInt(time[1]);
    var startTimeValue = parseInt(time[0]);
    var startTime =
      startTimeValue < 10
        ? "0" + time[0] + ":" + time[1]
        : time[0] + ":" + time[1];
    var endTimeValue = parseInt(time[0]) + 1;
    var endTime =
      endTimeValue < 10
        ? "0" + endTimeValue + ":" + time[1]
        : endTimeValue + ":" + time[1];
    this.availability = {
      starttime: startTime,
      endtime: endTime,
      dayofweek: dayOfWeek,
      updatedby: this.ProviderId,
      providerid: this.ProviderId,
      companyid: this.Companyid,
      clinic_address_id: this.CompanyClinicId,
      company_clinic_id: this.CompanyClinicId,

    };
    console.log(startTime, endTime, dayOfWeek);
    console.log(this.availability.startTime);
    console.log(this.availability.starttime);
    let availabilityPopup = this.modalCtrl.create(
      "SetAvailabilityPopupPage",
      this.availability
    );
    availabilityPopup.onDidDismiss((data, time) => {
      console.log("inside onDidDismiss modal");

      this.navCtrl.setRoot(this.navCtrl.getActive().component);

      if (time != null) {
        console.log("data: " + JSON.stringify(data));
        console.log("time: " + time);
        this.data = data;
        this.time = time;
        if (data != null) {
          //console.log('in clinic ')
          let request = {
            action: "U",
            availabletimes: [
              {
                availabilityid: data.availabilityid,
                clinic_address_id: data.clinic_address_id,
                clinic_location: data.clinic_location,
                dayofweek: data.dayofweek,
                starttime: data.starttime,
                endtime: time,
                home_clinic: data.home_clinic
              }
            ],
            companyid: this.Companyid,
            providerid: this.ProviderId,
            updatedby: this.ProviderId
          };
          // console.log("in clinic", request);
          // if(this.availability.startTime<this.time)
          // {
          //this.UpdateClinic(request)
          this.editAvailability(request);
          // }
          // else
          // {
          //   this.alertCtrl.create({
          //     title: 'Incorrect Time!',
          //     message:'please select a valid time',
          //   }).present();
          // }
          //  this.editAvailability(requestdata);
        } else {
          // console.log("else  home clinic ");
          let requestdata = {
            /* previousAvailability: null,
         availability: {
            date: this.availability.date,
            startTime: data.starttime,
            endTime: data.endtime,
            dayOfWeek: this.availability.dayofweek,
            id: '0',
            dummyId: null
          }*/
            action: "U",
            availabletimes: [
              {
                availabilityid: 0,
                clinic_address_id: this.ClinicAddressid,
                clinic_location: "2",
                dayofweek: this.availability.dayofweek,
                starttime: this.availability.starttime,
                endtime: this.time,
                home_clinic: 1
              }
            ],
            companyid: this.Companyid,
            providerid: this.ProviderId,
            updatedby: this.ProviderId
          };
          // console.log(requestdata);
          // this.UpdatehomeSlot( requestdata );
          this.editAvailability(requestdata);
        }
      } else {
        this.toastCtrl
          .create({
            message: "End time is null",
            duration: 2000
          })
          .present();
      }
    });
    availabilityPopup.present();
  }
  async UpdateClinic(requestdata) {
    console.log("inside UpdateAvailibilityPage UpdateClinic");
    var response = await this.apiProvider
      .Post(AppConst.GET_PROVIDER_AVAILABILITY, requestdata)
      .toPromise();
    // console.log(response);
    if (response["status"] == true) {
      this.toastCtrl
        .create({
          message: "Request has been sent to change the availability",
          duration: 2000
        })
        .present();
      this.getSavedAvailabilities();
      var component = this.navCtrl.getActive().component;
      this.navCtrl.pop();
      this.navCtrl.push(component);
    } else
      this.toastCtrl
        .create({
          message: response["message"],
          duration: 2000
        })
        .present();
  }
  async UpdatehomeSlot(requestdata) {
    console.log("inside UpdateAvailibilityPage UpdatehomeSlot");
    var response = await this.apiProvider
      .Post(AppConst.GET_PROVIDER_AVAILABILITY, requestdata)
      .toPromise();
    // console.log(response);
    if (response["status"] == true) {
      this.toastCtrl
        .create({
          message: "Request has been sent to change the availability",
          duration: 2000
        })
        .present();
      this.getSavedAvailabilities();
      var component = this.navCtrl.getActive().component;
      //this.navCtrl.pop();  //commented by nsp
      // this.navCtrl.push(component);
    } else
      this.toastCtrl
        .create({
          message: response["message"],
          duration: 2000
        })
        .present();
  }
  /*
   *
   *get clinic list
   *
   */
  async getClinicListpage() {
    console.log("inside UpdateAvailibilityPage getClinicListpage");
    var filters = [
      { fieldname: "provider_id", fieldvalue: "362", operators: "Equal" }
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
      companyid: this.Companyid,
      companyno: "",
      login_Userid: this.ProviderId,
      sourceapi: "wemalife"
      //  MemberId: AppState.UserCred.userid,
    };
    var response = await this.apiProvider
      .Post(AppConst.clinic, request)
      .toPromise();
    console.log(response);
    console.log(this.data);
  }
  /**
   * Availability Popup
   * @param availability
   */
  editAvailabilityPopup(availability: any) {
    console.log("inside UpdateAvailibilityPage editAvailabilityPopup");
    console.log('availability: '+JSON.stringify(availability));
    let availabilityPopup = this.modalCtrl.create(
      "SetAvailabilityPopupPage",
      availability
    );
    availabilityPopup.onDidDismiss((data, time) => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);

      console.log("inside UpdateAvailibilityPage editAvailabilityPopup onDidDismiss"
      );
      // console.log("data: " + JSON.stringify(data));
      // console.log("time: " + time);
      if (data != null && time != null) console.log("modal dismiss");
      if (time != "backdrop" && time != null) {
        if (data != null) {
          let request = {
            action: "U",
            availabletimes: [
              {
                availabilityid: data.availabilityid,
                clinic_address_id: data.clinic_address_id,
                clinic_location: data.clinic_location,
                dayofweek: data.dayofweek,
                starttime: data.starttime,
                endtime: time,
                home_clinic: data.home_clinic
              }
            ],
            companyid: this.Companyid,
            providerid: this.ProviderId,
            updatedby: this.ProviderId,
            createdby: this.ProviderId
          };
          console.log("inside UpdateAvailibilityPage editAvailabilityPopup onDidDismiss request: " +JSON.stringify(request));
          this.editAvailability(request);
        } else {
          let requestdata = {
            action: "U",
            availabletimes: [
              {
                availabilityid: 0,
                clinic_address_id: this.ClinicAddressid,
                clinic_location: "2",
                dayofweek: this.availability.dayofWeek,
                starttime: this.availability.starttime,
                endtime: this.time,
                home_clinic: 1
              }
            ],
            companyid: this.Companyid,
            providerid: this.ProviderId,
            updatedby: this.ProviderId
          };
          console.log("inside UpdateAvailibilityPage editAvailabilityPopup onDidDismiss else request: " +JSON.stringify(requestdata));
          this.editAvailability(requestdata);
        }
      } else {
        // console.log("time is null");
      }
    });
    availabilityPopup.present();
  }
  /**
   * Get availabilities of provider
   */
  async getSavedAvailabilities() {
    console.log("inside UpdateAvailibilityPage getSavedAvailabilities");
    //   let items = document.getElementsByClassName('weekDiv');
    // //  console.log(items)
    //   for (let i = 0; i < items.length; i++) {
    //     let item = <HTMLDivElement>items.item(i);
    //   console.log(item)
    //     item.style.height = '30px';
    //     item.innerHTML = '';
    //     if (item.hasAttribute('clickFlag')&&item.getAttribute('clickFlag')=='false')
    //       item.removeAttribute('clickFlag');
    //   }
    let filters = [
      {
        fieldname: "userid",
        fieldvalue: AppState.UserCred.userid,
        operators: "Equal"
      }
    ];
    var request = {
      filter: filters,
      filterproperty: { offset: 0, orderby: "firstname", recordlimit: 0 },
      app: true,
      auth: true
    };
    let response = await this.apiProvider
      .Post(AppConst.GET_PROVIDERS, request)
      .toPromise();
    console.log(JSON.stringify(response));
    if (
      response != null &&
      response.hasOwnProperty("records") &&
      response["records"].length > 0
    ) {
      this.provider = response["records"][0];
      this.Companyid = response["records"][0].companyid;
      this.ProviderId = response["records"][0].userid;
      this.CompanyClinicId = response["records"][0].company_clinic_id;
      this.ClinicAddressid = response["records"][0].company_clinic_id;
      if (this.provider != null) {
        if (
          this.provider.availability != null &&
          this.provider.availability.length > 0
        ) {
          this.availabilities = this.provider.availability.filter(
            x => x.companyid == AppState.UserCred.currentCompanyId
          );
          // console.log("availabilities: ");
          // console.log(JSON.stringify(this.availabilities));
          this.availabilities.forEach(availability => {
            let elements = document.getElementsByClassName("weekDiv");
            for (let i = 0; i < elements.length; i++) {
              let element = <HTMLDivElement>elements.item(i);
              let id = element.id.split("_");
              let items = this.availabilities.filter(x => x.dayofweek == id[3]);
              if (items != null && items.length > 0) {
                items.forEach(availability => {
                  var timeStart = new Date(
                    "01/01/2007 " + availability.starttime
                  ).getHours();
                  var timeEnd = new Date(
                    "01/01/2007 " + availability.endtime
                  ).getHours();
                  var hourDiff = timeEnd - timeStart;
                  var startTimes = availability.starttime.split(":");
                  var endTimes = availability.endtime.split(":");
                  //console.log(id)
                  //previous candition :commented by nsp
                  // if (parseInt(id[1]) < parseInt(endTimes[0]) && id[3] == availability.dayofweek && element.getAttribute('clickFlag') == null) {
                  //current candition :added by nsp
                  if (availability.dayofweek == "5") {
                    // console.log("all out ----- calendar data =  startTimes-"+startTimes+", endTimes-"+endTimes +", id-"+id)
                  }
                  if (
                    parseInt(id[1]) <= parseInt(endTimes[0]) &&
                    parseInt(id[1]) >= parseInt(startTimes[0]) &&
                    id[3] == availability.dayofweek &&
                    id[3] == availability.dayofweek &&
                    element.getAttribute("clickFlag") == null
                  ) {
                    if (availability.dayofweek == "5") {
                      // console.log("outer----- calendar data =  startTimes-" + startTimes + ", endTimes-" + endTimes + ", id-" + id );
                    }
                    if (
                      id[1] != "" &&
                      parseInt(startTimes[1]) === parseInt("30") &&
                      parseInt(id[2]) != parseInt(startTimes[1]) &&
                      parseInt(id[1]) === parseInt(startTimes[0])
                    ) {
                      if (availability.dayofweek == "5") {
                        // console.log( "iffff calendar data =  startTimes-" + startTimes + ", endTimes-" + endTimes + ", id-" + id );
                      }
                    } else if (
                      parseInt(endTimes[1]) === parseInt("30") &&
                      parseInt(id[1]) === parseInt(endTimes[0])
                    ) {
                      if (parseInt(id[2]) === parseInt(endTimes[1])) {
                      } else {
                        let innerDiv = document.createElement("div");
                        innerDiv.style.height = "30px";
                        innerDiv.style.background = "#f90";
                        console.log("availability: " + availability);
                        innerDiv.style.background =
                          availability.hasOwnProperty("home_clinic") &&
                          availability.home_clinic == "1"
                            ? "#e28028"
                            : "#408eb2";
                        console.log("innerDiv: " + innerDiv);
                        element.addEventListener("click", () => {
                          this.editAvailabilityPopup(availability);
                        });
                        element.setAttribute("clickFlag", "true");
                        element.appendChild(innerDiv);
                      }
                      if (availability.dayofweek == "5") {
                        // console.log("el--- calendar data =  startTimes-" + startTimes +", endTimes-" + endTimes + ", id-" + id );
                      }
                    } else {
                      if (
                        parseInt(endTimes[1]) === parseInt("0") &&
                        parseInt(id[1]) === parseInt(endTimes[0])
                      ) {
                      } else {
                        if (availability.dayofweek == "5") {
                          // console.log("elssssee new calendar data =  startTimes-" + startTimes + ", endTimes-" + endTimes + ", id-" + id );
                        }
                        let innerDiv = document.createElement("div");
                        innerDiv.style.height = "30px";
                        // console.log(availability);
                        innerDiv.style.background =
                          availability.hasOwnProperty("home_clinic") &&
                          availability.home_clinic == "1"
                            ? "#e28028"
                            : "#408eb2";
                        // console.log(innerDiv);
                        element.addEventListener("click", () => {
                          this.editAvailabilityPopup(availability);
                        });
                        element.setAttribute("clickFlag", "true");
                        element.appendChild(innerDiv);
                      }
                    }
                  } else {
                    let exist = false;
                    items.forEach(item => {
                      if (
                        parseInt(id[1]) >=
                          parseInt(item.starttime.split(":")[0]) &&
                        parseInt(id[1]) < parseInt(item.endtime.split(":")[0])
                      )
                        exist = true;
                    });
                    if (
                      exist == false &&
                      element.getAttribute("clickFlag") == null
                    ) {
                      //Commented by : nsp -  previous code start from here
                      /*element.setAttribute('clickFlag', 'true');    //Commented by mag (nsp to fill enddate half hour )
                    let param = id[1] + '_' + (id[2] == '0' ? id[2] + '0' : id[2]) + '_' + (id[3] == '0' ? '7' : id[3]);
                    element.addEventListener('click', () => {
                      this.showAvailabilityPopup(param);
                    });*/
                      //Commented by : nsp -  previous code end from here
                      //additional code added  by : nsp -  start here
                      let callclickFlag = false;
                      if (
                        id[1] != "" &&
                        parseInt(startTimes[1]) === parseInt("30") &&
                        parseInt(id[2]) != parseInt(startTimes[1]) &&
                        parseInt(id[1]) === parseInt(startTimes[0])
                      ) {
                        callclickFlag = true;
                        element.setAttribute("clickFlag", "true"); //Commented by mag (nsp to fill enddate half hour )
                      } else if (
                        parseInt(endTimes[1]) === parseInt("30") &&
                        parseInt(id[1]) === parseInt(endTimes[0])
                      ) {
                        callclickFlag = true;
                      }
                      if (callclickFlag) {
                        element.setAttribute("clickFlag", "true");
                        let param =
                          id[1] +
                          "_" +
                          (id[2] == "0" ? id[2] + "0" : id[2]) +
                          "_" +
                          (id[3] == "0" ? "7" : id[3]);
                        element.addEventListener("click", () => {
                          this.showAvailabilityPopup(param);
                        });
                      }
                      //additional code added  by : nsp -  end here
                    }
                  }
                });
              }
              let exist = false;
              items.forEach(item => {
                if (
                  parseInt(id[1]) >= parseInt(item.starttime.split(":")[0]) &&
                  parseInt(id[1]) < parseInt(item.endtime.split(":")[0])
                )
                  exist = true;
              });
              if (exist == false && element.getAttribute("clickFlag") == null) {
                element.setAttribute("clickFlag", "true");
                let param =
                  id[1] +
                  "_" +
                  (id[2] == "0" ? id[2] + "0" : id[2]) +
                  "_" +
                  (id[3] == "0" ? "7" : id[3]);
                element.addEventListener("click", () => {
                  this.showAvailabilityPopup(param);
                });
              }
            }
          });
        } else {
          let elements = document.getElementsByClassName("weekDiv");
          for (let i = 0; i < elements.length; i++) {
            let element = <HTMLDivElement>elements.item(i);
            let id = element.id.split("_");
            element.setAttribute("clickFlag", "true");
            let param =
              id[1] +
              "_" +
              (id[2] == "0" ? id[2] + "0" : id[2]) +
              "_" +
              (id[3] == "0" ? "7" : id[3]);
            element.addEventListener("click", () => {
              this.showAvailabilityPopup(param);
            });
          }
        }
      }
    }
  }
  /**
   * Set availabilty of provider
   */
  editAvailability(requestdata: any) {
    console.log("inside UpdateAvailibilityPage editAvailability");
    if (AppState.IsAvailabilityEdit) {
      if (requestdata.previousAvailability != null) {
        requestdata.availability.availabilityid =
          requestdata.previousAvailability.availabilityid;
      }
      console.log("changeAvailability function");
      this.changeAvailability(requestdata.availability,requestdata.previousAvailability);
    } else {
      console.log("set function");
      this.setAvailability(requestdata.availability,requestdata.previousAvailability);
    }
  }
  /**
   * Change availability of provider
   */
  async changeAvailability(
    selectedAvailability: any,
    previousAvailability: any
  ) {
    console.log("inside UpdateAvailibilityPage changeAvailability");
    if (this.time != "backdrop" && this.time != null) {
      if (this.data != null) {
        // console.log( "====================================3333333==========================" );
        var request = {
          action: "U",
          availabletimes: [
            {
              availabilityid: 0,
              clinic_address_id: this.data.id,
              clinic_location: this.data.clinic_status,
              dayofweek: this.availability.dayofweek,
              starttime: this.availability.starttime,
              endtime: this.time,
              home_clinic: 1
            }
          ],
          companyid: this.Companyid,
          providerid: this.ProviderId,
          updatedby: this.ProviderId
          /*   ProviderId: AppState.UserCred.userid,
      AvailableTimes: [selectedAvailability],
      Action: "U",
      CompanyId: AppState.UserCred.currentCompanyId,
      UpdatedBy: AppState.UserCred.userid*/
        };
      } else {
        var requestdata = {
          action: "U",
          availabletimes: [
            {
              availabilityid: 0,
              clinic_address_id: this.ClinicAddressid,
              clinic_location: "2",
              dayofweek: this.availability.dayofweek,
              starttime: this.availability.starttime,
              endtime: this.time,
              home_clinic: 1
            }
          ],
          companyid: this.Companyid,
          providerid: this.ProviderId,
          updatedby: this.ProviderId
        };
      }
    } else {
      // console.log("null time data");
    }
    if (this.availability.starttime < this.time) {
      var response = await this.apiProvider
        .Post(AppConst.GET_PROVIDER_AVAILABILITY, requestdata)
        .toPromise();
      if (response != null) {
        if (response["status"]) {
          this.toastCtrl
            .create({
              message: "Request has been sent to change the availability",
              duration: 2000
            })
            .present();
          this.getSavedAvailabilities();
          //location.reload(true);
          var component = this.navCtrl.getActive().component;
          this.navCtrl.pop();
          this.navCtrl.push(component);
          //if (component.ionViewDidLoad) {
          //component.ionViewDidLoad();
          //}
        } else if (response["message"] == "Overlapping timings") {
          this.toastCtrl
            .create({
              //  message: response['message'],
              message:
                "Availability cannot be set as it overlaps previously set time.",
              duration: 2000
            })
            .present();
        } else {
          // console.log("else");
          this.toastCtrl
            .create({
              message: response["message"],
              //  message:'Availability cannot be set as it overlaps previously set time.',
              duration: 2000
            })
            .present();
        }
      }
    } else {
      this.toastCtrl
        .create({
          message: "Please Enter a Valid Time ",
          duration: 2000
        })
        .present();
    }
    /* if (this.availability.starttime<this.time){
    var response = await this.apiProvider.Post(AppConst.GET_PROVIDER_AVAILABILITY, request).toPromise();
    if (response != null) {
      if (response['status']) {
        this.toastCtrl.create({
          message: 'Request has been sent to change the availability',
          duration: 2000
        }).present();
        this.getSavedAvailabilities();
        //location.reload(true);
        var component=this.navCtrl.getActive().component;
        this.navCtrl.pop();
        this.navCtrl.push(component);
        //if (component.ionViewDidLoad) {
          //component.ionViewDidLoad();
      //}
      }
      else
      if(response['message']=='Overlapping timings'){
        this.toastCtrl.create({
        //  message: response['message'],
        message:'Availability cannot be set as it overlaps previously set time.',
          duration: 2000
        }).present();
      }
        else
        {
          console.log("else")
          this.toastCtrl.create({
            message: response['message'],
        //  message:'Availability cannot be set as it overlaps previously set time.',
            duration: 2000
          }).present();}
    }
  }
  else
  {
    console.log("valid time required")
    this.toastCtrl.create({
      message: 'Please Enter a Valid Time ',
      duration: 2000
    }).present();
  }*/
  }
  /**
   *
   */
  async setAvailability(selectedAvailability: any, previousAvailability: any) {}
  /**
   * Get current date of the week
   */
  getCurrentNavigatedDateWeek() {
    console.log("inside UpdateAvailibilityPage getCurrentNavigatedDateWeek");
    let difference = this.currentDate.getDay() - 1;
    if (difference < 0) difference += 7;
    return new Date(
      this.currentDate.getTime() + -1 * difference * 24 * 60 * 60 * 1000
    );
  }
  /**
   * Navigate to next week
   */
  goToNextWeek() {
    console.log("inside UpdateAvailibilityPage goToNextWeek");
    this.currentNavigatedDateWeek = new Date(
      this.currentNavigatedDateWeek.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    // console.log(this.currentNavigatedDateWeek);
    this.currentDate = this.currentNavigatedDateWeek;
    // console.log(this.currentDate);
    this.getWeekDays();
    // this.getWeekAppointments();
  }
  goToPrevWeek() {
    console.log("inside UpdateAvailibilityPage goToPrevWeek");
    this.currentNavigatedDateWeek = new Date(
      this.currentNavigatedDateWeek.getTime() - 7 * 24 * 60 * 60 * 1000
    );
    // console.log(this.currentNavigatedDateWeek);
    this.currentDate = this.currentNavigatedDateWeek;
    // console.log(this.currentDate);
    this.getWeekDays();
    // this.getWeekAppointments();
  }
  /**
   * Get week days
   */
  getWeekDays() {
    console.log("inside UpdateAvailibilityPage getWeekDays");
    // console.log("innew week data");
    var dates = [];
    for (let i = 0; i <= 6; i++) {
      dates.push(
        new Date(
          this.currentNavigatedDateWeek.getTime() + i * 24 * 60 * 60 * 1000
        ).getDate()
      );
    }
    // console.log(dates);
    this.weekDates = dates;
  }
  /**
   * Get month view dates
   */
  getMonthDates() {
    console.log("inside UpdateAvailibilityPage getMonthDates");
    //  this.monthHeader = Helper.getFullMonth(this.currentNavigatedDateMonth.getMonth()) + ' ' + this.currentNavigatedDateMonth.getFullYear();
    this.monthHeader = Helper.getFullMonth(
      this.currentNavigatedDateMonth.getMonth()
    );
    let currentMonthNumberOfDays = new Date(
      this.currentNavigatedDateMonth.getFullYear(),
      this.currentNavigatedDateMonth.getMonth() + 1,
      0
    ).getDate();
    this.currentMonthDates = [];
    for (let i = 1; i <= currentMonthNumberOfDays; i++) {
      this.currentMonthDates.push(
        new Date(
          this.currentNavigatedDateMonth.getFullYear(),
          this.currentNavigatedDateMonth.getMonth(),
          i
        )
      );
    }
    let firstDay = this.currentMonthDates["0"].getDay() + 1;
    this.row = 0;
    this.column = firstDay;
    //Clear month divs
    let items = document.getElementsByClassName("monthDiv");
    for (let i = 0; i < items.length; i++) {
      let item = <HTMLDivElement>items.item(i);
      //item.style.height = '30px';
      item.innerHTML = "";
    }
    // this.currentMonthDates.forEach(element => {
    //   this.setMonthDivs(element, currentMonthNumberOfDays);
    // });
  }

  goHome() {
    console.log("inside goHome()");
    this.navCtrl.setRoot(ProviderDashboardPage);
  }
}
