import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  Events,
  ViewController,
  ToastController,
  LoadingController
} from "ionic-angular";
import { DatePipe } from "../../../node_modules/@angular/common";
import { Moment } from "moment";
import { ChangeServiceTypePage } from "../change-service-type/change-service-type";
import { AppConst } from "../../AppConst";
import { ApiProvider } from "../../providers/api/api";
import { AppState } from "../../AppStates";
import { HomePage } from "../home/home";
import { MemberloginPage } from "../memberlogin/memberlogin";
import { CartPage } from "../cart/cart";
import { CartSessionRequest } from "../../requestmodels/CartSessionRequest";
import { SearchServicesPage } from "../search-services/search-services";
/**
 * Generated class for the BookAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-book-appointment",
  templateUrl: "book-appointment.html"
})
export class BookAppointmentPage {
  loader: any;
  BookingData: any;
  ServicesType: any;
  servicesid: any;
  ServiceName: any;
  Date: any;
  EndData: any;
  endTime: any;
  endtime: any;
  endTimes = [];
  timeValue: string;
  firsttime: any;
  Services: any;
  services: any;
  companies: any;
  provider: any;
  company: any;
  firstDay: any;
  secondDay: any;
  thirdDay: any;
  fourthDay: any;
  fifthDay: any;
  sixthDay: any;
  seventhDay: any;
  data: any;
  firstname: any;
  Lastname: any;
  rate: any;
  currency: any;
  date: any;
  session: any;
  Time: any;
  providerId: any;
  CompanyId: any;
  Companyname: any;
  duration: any;
  public appState = AppState;
  slotTimes1: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes2: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes3: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes4: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes5: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes6: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes7: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  Endtime: any;
  selectedId = "1";
  bookingfirstpagedata: any;
  AppointmentTypeShow: boolean = false;
  isAddtoCardBtnDisable: boolean = true;
  totalprice: any = "";
  addToCartFinalMessage = "";
  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    public apiProvider: ApiProvider,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    public toastCtrl: ToastController,
    private datePipe: DatePipe,
    private events: Events,
    private loadingcontroller: LoadingController
  ) {
    console.log('BookAppointmentPage constructor');
    console.log(navParams.data);
    this.BookingData = navParams.data;
    if (this.BookingData != null && this.BookingData.bookingfirstpagedata) {
      this.bookingfirstpagedata = this.BookingData.bookingfirstpagedata;
      if (this.bookingfirstpagedata.companyid != "") {
        AppState.GlobalBookingCompanyId = this.bookingfirstpagedata.companyid;
        //alert(AppState.GlobalBookingCompanyId);
      }
      if (
        this.bookingfirstpagedata.serviceid != "" &&
        this.bookingfirstpagedata.providerid != ""
      ) {
        AppState.GlobalBookingServiceId = this.bookingfirstpagedata.serviceid;
        AppState.GlobalBookingProviderId = this.bookingfirstpagedata.providerid;
      } else {
        alert("Book appointment inforrmation are missing.");
        this.navCtrl.pop();
      }
    } else {
      alert("Book appointment inforrmation are missing.");
      this.navCtrl.pop();
    }
    this.totalprice = this.BookingData.SelectedSlot.price;       
    if (
      this.BookingData.ServicesType.hasOwnProperty("Currency") &&
      this.BookingData.ServicesType.Currency != undefined
    ) {
      this.currency = this.BookingData.ServicesType.Currency;
    } else if (
      this.BookingData.ServicesType.hasOwnProperty("SetCurrency") &&
      this.BookingData.ServicesType.SetCurrency != undefined
    ) {
      this.currency = this.BookingData.ServicesType.SetCurrency;
    }
    this.Date = this.BookingData.SelectedSlot.date;
    //  console.log(  this.BookingData.SelectedSlot)
    this.EndData = this.BookingData.SelectedSlot.time;
    if (this.EndData != undefined) {
      this.endTimes = this.EndData.split(":");
      // console.log(this.endTimes[1])
      this.firsttime = this.endTimes[0];
      this.endtime = this.endTimes[1];
    }
    //      var twentyMinutesLater = new Date();
    //      twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20)
    // console.log(twentyMinutesLater)
    // console.log(twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20))
    var twentyMinutesLater = this.endtime + 20 * 60 * 1000;
    // console.log("twentyMinutesLater= "+twentyMinutesLater)
    if (this.endtime == "00") {
      this.timeValue = "30";
      // console.log(this.timeValue)
    } else if (this.endtime == "15") {
      //  console.log('in 30')
      this.timeValue = "30";
      // console.log(this.timeValue)
    } else if (this.endtime == "30") {
      this.timeValue = "45";
      // console.log("timeValue"+this.timeValue)
    } else {
      this.timeValue = "60";
      // console.log("timeValue"+this.timeValue)
    }

    //code by json mafia

    console.log('code by jsonMafia');
    console.log(this.BookingData);
    if (
      this.BookingData.hasOwnProperty("session_duration") &&
      this.BookingData.session_duration != undefined
    ) {
      //this.endTime = this.BookingData.ServicesType.ServicesType.provider_session;

      let temp_time = new Date(this.BookingData.SelectedSlot.date+' '+this.BookingData.SelectedSlot.time);
      let temp_hour = '';
      let temp_min = '';
      temp_time.setTime(temp_time.getTime() + (this.BookingData.session_duration*60*1000));  
      console.log(temp_time.getTime());
      console.log('time after adding session: '+temp_time); 

      temp_hour = (temp_time.getHours() < 10 ? '0' : '') + temp_time.getHours();
      temp_min = (temp_time.getMinutes() < 10 ? '0' : '') + temp_time.getMinutes();

      // if(temp_time.getHours() >= 10){
      //   temp_hour = temp_time.getHours();
      // } else {
      //   temp_hour = parseInt('0'+temp_time.getHours());
      // }
      
      // if(temp_time.getMinutes() >= 10){
      //   temp_min = temp_time.getMinutes();
      // } else {
      //   temp_min = parseInt('0'+temp_time.getMinutes());
      // }
      
      this.Endtime = temp_hour + ":" + temp_min;
      console.log('endTime: '+this.Endtime);
    }

    // console.log("firsttime : timeValue"+this.firsttime+':'+this.timeValue)
    // this.Endtime=this.firsttime+':'+this.timeValue
    // console.log("endtime="+this.endtime)
    this.servicesid = this.BookingData.ServicesType.servicesid;
    console.log("servicesid="+this.servicesid);
    this.ServicesType = this.BookingData.ServicesType.servicesoffered;
    if (
      this.servicesid == undefined &&
      this.BookingData.ServicesType.hasOwnProperty("serviceid")
    ) {
      this.servicesid = this.BookingData.ServicesType.serviceid;
    }
    for (let key in this.ServicesType) {
      if (this.ServicesType[key].serviceid == this.servicesid) {
        //  console.log('ServicesType inservices id =',this.ServicesType[key])
        this.ServiceName = this.ServicesType[key];
      }
      // console.log(this.ServicesType[key])
      for (let i in this.ServicesType[key]) {
        //console.log(this.ServicesType[key].serviceid)
        if (this.ServicesType[key][i].serviceid == this.servicesid) {
          // console.log('inservices id',this.ServicesType[key][i])
        }
      }
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BookAppointmentPage');
    console.log(this.ServiceName.servicename)
    this.Services = this.ServiceName.servicename;
    this.getAvailableSlots();
  }
  ratedropdown(selectedId: any) {
    this.selectedId = selectedId;
    this.AppointmentTypeShow = false;
    this.getAvailableSlots();
  }
  ChangeType() {
    // this.navCtrl.push(ChangeServiceTypePage)
    var ChangeServiceType = this.modalCtrl.create("SearchServicesPage", {
      enableBackdropDismiss: true
    });
    ChangeServiceType.onDidDismiss(data => {
      // console.log(data)
      this.Services = data.servicename;
      this.servicesid = data.serviceid;
      AppState.GlobalBookingServiceId = this.servicesid;
      this.getAvailableSlots();
      //console.log(data.serviceid)
      // this.servicesid=data.serviceid;
      // this.getProviders()
    });
    ChangeServiceType.present();
  }
  async getAvailableSlots() {
    // this.loader = this.loadingcontroller.create({
    //   content:"please wait.."
    // })
    // this.loader.present()
    var request = {
      Allslot: this.bookingfirstpagedata.Allslot,
      clinic_id: this.bookingfirstpagedata.clinic_id,
      clinicserviceavailable: this.bookingfirstpagedata.clinicserviceavailable,
      companyid: this.bookingfirstpagedata.companyid,
      date: this.BookingData.SelectedSlot.date,
      duration: this.bookingfirstpagedata.duration,
      home_clinic: this.bookingfirstpagedata.home_clinic,
      homeserviceavailable: this.bookingfirstpagedata.homeserviceavailable,
      providerid: AppState.GlobalBookingProviderId,
      serviceid: AppState.GlobalBookingServiceId,
      time: "06:00",
      type: "days",
      uniqueid: "",
      select_clinic_id: this.bookingfirstpagedata.select_clinic_id
    };
    var response = await this.apiProvider
      .Post(AppConst.GET_ADHOC_PROVIDER_AVAILABILITY, request)
      .toPromise();
    this.addToCartFinalMessage = "";
    this.isAddtoCardBtnDisable = true;
    if (
      response != null &&
      response.hasOwnProperty("records") &&
      response["records"].length > 0
    ) {
      //  console.log('inside getAvailableSlots() | response: '+JSON.stringify(response));
      this.totalprice = 0;
      this.currency = response["records"]["0"]["currency"];
      this.firstDay = this.datePipe.transform(this.Date, "dd-MMM-yy");
      this.secondDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 24 * 60 * 60 * 1000,
        "dd-MMM-yy"
      );
      this.thirdDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 48 * 60 * 60 * 1000,
        "dd-MMM-yy"
      );
      this.fourthDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 72 * 60 * 60 * 1000,
        "dd-MMM-yy"
      );
      this.fifthDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 96 * 60 * 60 * 1000,
        "dd-MMM-yy"
      );
      this.sixthDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 120 * 60 * 60 * 1000,
        "dd-MMM-yy"
      );
      this.seventhDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 144 * 60 * 60 * 1000,
        "dd-MMM-yy"
      );
      let available = response["records"]["0"]["available"];
      let i: number = 0;
      for (var key in available) {
        if (i == 0 && available.hasOwnProperty(key) && available[key] != null) {          
          var slots = available[key].time;
          var rates = available[key].rate;
          var hourfollowrates = available[key].followup_rate;
          var home_clinic_data = available[key].home_clinic;
          this.slotTimes1 = [];
          let j: number = 0;
          for (let s in slots) {
            this.slotTimes1.push({
              date: key,
              time: slots[s],
              price: rates[slots[s]],
              followup_rate: hourfollowrates[slots[s]]
            });
            j++;
          }
        } else if (
          i == 1 &&
          available.hasOwnProperty(key) &&
          available[key] != null
        ) {
          var slots = available[key].time;
          var rates = available[key].rate;
          var hourfollowrates = available[key].followup_rate;
          this.slotTimes2 = [];
          let j: number = 0;
          for (let s in slots) {
            this.slotTimes2.push({
              date: key,
              time: slots[s],
              price: rates[slots[s]],
              followup_rate: hourfollowrates[slots[s]]
            });
            j++;
          }
        } else if (
          i == 2 &&
          available.hasOwnProperty(key) &&
          available[key] != null
        ) {
          var slots = available[key].time;
          var rates = available[key].rate;
          var hourfollowrates = available[key].followup_rate;
          this.slotTimes3 = [];
          let j: number = 0;
          for (let s in slots) {
            this.slotTimes3.push({
              date: key,
              time: slots[s],
              price: rates[slots[s]],
              followup_rate: hourfollowrates[slots[s]]
            });
            j++;
          }
        } else if (
          i == 3 &&
          available.hasOwnProperty(key) &&
          available[key] != null
        ) {
          var slots = available[key].time;
          var rates = available[key].rate;
          var hourfollowrates = available[key].followup_rate;
          this.slotTimes4 = [];
          let j: number = 0;
          for (let s in slots) {
            this.slotTimes4.push({
              date: key,
              time: slots[s],
              price: rates[slots[s]],
              followup_rate: hourfollowrates[slots[s]]
            });
            j++;
          }
        } else if (
          i == 4 &&
          available.hasOwnProperty(key) &&
          available[key] != null
        ) {
          var slots = available[key].time;
          var rates = available[key].rate;
          var hourfollowrates = available[key].followup_rate;
          this.slotTimes5 = [];
          let j: number = 0;
          for (let s in slots) {
            this.slotTimes5.push({
              date: key,
              time: slots[s],
              price: rates[slots[s]],
              followup_rate: hourfollowrates[slots[s]]
            });
            j++;
          }
        } else if (
          i == 5 &&
          available.hasOwnProperty(key) &&
          available[key] != null
        ) {
          var slots = available[key].time;
          var rates = available[key].rate;
          var hourfollowrates = available[key].followup_rate;
          this.slotTimes6 = [];
          let j: number = 0;
          for (let s in slots) {
            this.slotTimes6.push({
              date: key,
              time: slots[s],
              price: rates[slots[s]],
              followup_rate: hourfollowrates[slots[s]]
            });
            j++;
          }
        } else if (
          i == 6 &&
          available.hasOwnProperty(key) &&
          available[key] != null
        ) {
          var slots = available[key].time;
          var rates = available[key].rate;
          var hourfollowrates = available[key].followup_rate;
          this.slotTimes7 = [];
          let j: number = 0;
          for (let s in slots) {
            this.slotTimes7.push({
              date: key,
              time: slots[s],
              price: rates[slots[s]],
              followup_rate: hourfollowrates[slots[s]]
            });
            j++;
          }
        }
        i++;
      }
      // console.log('this.slotTimes1,this.slotTimes2,this.slotTimes3: '+JSON.stringify(this.slotTimes1),JSON.stringify(this.slotTimes2),JSON.stringify(this.slotTimes3))
      //commented by nsp
      //  if(this.slotTimes1[0]==null && this.slotTimes2[0]==null && this.slotTimes3[0]==null || this.slotTimes1[0].price=='' ||  this.slotTimes2[0].price=='' ||this.slotTimes3[0].price=='' )
      //added by nsp
      if (
        this.slotTimes1[0] == null &&
        this.slotTimes2[0] == null &&
        this.slotTimes3[0] == null &&
        this.slotTimes4[0] == null &&
        this.slotTimes5[0] == null &&
        this.slotTimes6[0] == null &&
        this.slotTimes7[0] == null
      ) {
        this.totalprice = "";
        // console.log('in null slotes')
        this.addToCartFinalMessage = "Slotes not defined.";
        this.BookingData.SelectedSlot = {
          date: this.Date,
          time: this.EndData,
          price: "NOT defined"
        };
        this.isAddtoCardBtnDisable = true;
      }
      // console.log('this.BookingData.SelectedSlot: '+this.BookingData.SelectedSlot)
      else
        for (let i in this.slotTimes1)
          if (this.slotTimes1[i].time == this.EndData) {
            // console.log('in first slot',this.slotTimes1[i]);
            if (this.selectedId == "1") {
              //alert('if - '+this.selectedId);
              this.totalprice =
                this.slotTimes1[i].price != "" ? this.slotTimes1[i].price : "0";
              this.isAddtoCardBtnDisable = false;
            } else if (this.selectedId == "2") {
              //alert('else - '+this.selectedId);
              this.totalprice =
                this.slotTimes1[i].followup_rate != ""
                  ? this.slotTimes1[i].followup_rate
                  : "0";
              this.isAddtoCardBtnDisable = false;
            }
            //alert(this.totalprice);
            if (this.slotTimes1[i].price == "") {
              this.BookingData.SelectedSlot = {
                date: this.Date,
                time: this.EndData,
                price: "NOT defined"
              };
            } else {
              this.BookingData.SelectedSlot = this.slotTimes1[i];
            }
          }
      for (let i in this.slotTimes2)
        if (this.slotTimes2[i].time == this.EndData) {
          if (this.selectedId == "1") {
            this.totalprice =
              this.slotTimes2[i].price != "" ? this.slotTimes2[i].price : "0";
            this.isAddtoCardBtnDisable = false;
          } else if (this.selectedId == "2") {
            this.totalprice =
              this.slotTimes2[i].followup_rate != ""
                ? this.slotTimes2[i].followup_rate
                : "0";
            this.isAddtoCardBtnDisable = false;
          }
          // console.log('in second slot',this.slotTimes2[i])
          this.BookingData.SelectedSlot = this.slotTimes2[i];
        }
      for (let i in this.slotTimes3)
        if (this.slotTimes3[i].time == this.EndData) {
          if (this.selectedId == "1") {
            this.totalprice =
              this.slotTimes3[i].price != "" ? this.slotTimes3[i].price : "0";
            this.isAddtoCardBtnDisable = false;
          } else if (this.selectedId == "2") {
            this.totalprice =
              this.slotTimes3[i].followup_rate != ""
                ? this.slotTimes3[i].followup_rate
                : "0";
            this.isAddtoCardBtnDisable = false;
          }
          // console.log('in third slot',this.slotTimes3[i])
          this.BookingData.SelectedSlot = this.slotTimes3[i];
        }
      for (let i in this.slotTimes4)
        if (this.slotTimes4[i].time == this.EndData) {
          if (this.selectedId == "1") {
            this.totalprice =
              this.slotTimes4[i].price != "" ? this.slotTimes4[i].price : "0";
            this.isAddtoCardBtnDisable = false;
          } else if (this.selectedId == "2") {
            this.totalprice =
              this.slotTimes4[i].followup_rate != ""
                ? this.slotTimes4[i].followup_rate
                : "0";
            this.isAddtoCardBtnDisable = false;
          }
          // console.log('in fourth slot',this.slotTimes4[i])
          this.BookingData.SelectedSlot = this.slotTimes4[i];
        }
      for (let i in this.slotTimes5)
        if (this.slotTimes5[i].time == this.EndData) {
          if (this.selectedId == "1") {
            this.totalprice =
              this.slotTimes3[i].price != "" ? this.slotTimes5[i].price : "0";
            this.isAddtoCardBtnDisable = false;
          } else if (this.selectedId == "2") {
            this.totalprice =
              this.slotTimes5[i].followup_rate != ""
                ? this.slotTimes5[i].followup_rate
                : "0";
            this.isAddtoCardBtnDisable = false;
          }
          // console.log('in fifth slot',this.slotTimes5[i])
          this.BookingData.SelectedSlot = this.slotTimes5[i];
        }
      for (let i in this.slotTimes6)
        if (this.slotTimes6[i].time == this.EndData) {
          if (this.selectedId == "1") {
            this.totalprice =
              this.slotTimes6[i].price != "" ? this.slotTimes6[i].price : "0";
            this.isAddtoCardBtnDisable = false;
          } else if (this.selectedId == "2") {
            this.totalprice =
              this.slotTimes6[i].followup_rate != ""
                ? this.slotTimes6[i].followup_rate
                : "0";
            this.isAddtoCardBtnDisable = false;
          }
          // console.log('in sixth slot',this.slotTimes6[i])
          this.BookingData.SelectedSlot = this.slotTimes6[i];
        }
      for (let i in this.slotTimes7)
        if (this.slotTimes7[i].time == this.EndData) {
          if (this.selectedId == "1") {
            this.totalprice =
              this.slotTimes7[i].price != "" ? this.slotTimes7[i].price : "0";
            this.isAddtoCardBtnDisable = false;
          } else if (this.selectedId == "2") {
            this.totalprice =
              this.slotTimes7[i].followup_rate != ""
                ? this.slotTimes7[i].followup_rate
                : "0";
            this.isAddtoCardBtnDisable = false;
          }
          // console.log('in seventh slot',this.slotTimes7[i])
          this.BookingData.SelectedSlot = this.slotTimes7[i];
        }
    } else {
      // console.log('inside getAvailableSlots() | no response found');
      this.totalprice = "";
      this.isAddtoCardBtnDisable = true;
      this.addToCartFinalMessage = 
      "Sorry something went wrong, Please change your service.";
    }
    // this.loader.dismiss();
    if (this.totalprice == "") {
      this.addToCartFinalMessage = "No Price.";
    }
    if (this.addToCartFinalMessage != "") {
      this.toastCtrl
        .create({
          message: "Sorry something went wrong, Please change your service.",
          duration: 3000
        })
        .present();
    }
  }
  addCart() {
    // console.log(AppState.IsMember)
    // if(AppState.IsMember!=true)
    // {
    //   this.navCtrl.push(MemberloginPage)
    // }
    // else
    // {
    //   console.log('in add to cart page ')
    //this.navCtrl.push(CartPage )
    // console.log(AppState.UserCred)
    if (AppState.UserCred != undefined) {
      this.addToCart();
    } else {
      this.navCtrl.push("MemberloginPage", this.navParams.data);
    }
    //}
    // this.navCtrl.push(sli)
  }
  async addToCart() {
    if (AppState.CartCount <= 1) {
      let cartSessionRequest: CartSessionRequest = null;
      if (AppState.CartCount == 0) cartSessionRequest = { action: "c" };
      else if (AppState.CartCount == 1)
        cartSessionRequest = { action: "u", uniqueId: AppState.UniqueId };
      var responseSession = await this.apiProvider
        .Post(AppConst.CREATE_CART_SESSION, cartSessionRequest)
        .toPromise();
      // console.log(responseSession);
      if (responseSession != null && responseSession["status"] == true) {
        AppState.UniqueId = responseSession["uniqid"];
      }
    }
    var requestCarts = {
      //clinic_place_id: "39",
      clinic_place_id: this.BookingData.ServicesType.clinic_id,
      companyid: this.BookingData.ServicesType.companyid,
      date: this.Date,
      duration: this.BookingData.session_duration,
      endtime: this.Endtime,
      //home_clinic: "0",
      home_clinic: this.bookingfirstpagedata.home_clinic,
      itemprice: this.totalprice,
      memberid: AppState.UserCred.userid,
      // providerid:this.BookingData.ServicesType.providerid,
      providerid: AppState.GlobalBookingProviderId,
      rate_type: "1",
      //serviceid: this.BookingData.ServicesType.servicesid,
      serviceid: AppState.GlobalBookingServiceId,
      starttime: this.EndData,
      type: 1,
      uniqueid: AppState.UniqueId
    };
    var response = await this.apiProvider
      .Post(AppConst.SAVE_CART_ITEMS, requestCarts)
      .toPromise();
    if (response != null && response["status"] == true) {
      AppState.CartCount = response["cartCount"];
      var int = AppState.CartCount;
      // console.log('count:'+int);
      this.events.publish("updatecart", true);
      this.viewCtrl.dismiss({ flag: "addtocart" });
      this.navCtrl.push("CartPage");
    } else {
      this.toastCtrl
        .create({
          message: response["message"],
          duration: 2000
        })
        .present();
    }
  }
  viewCart() {
    this.navCtrl.push("CartPage");
  }
}
