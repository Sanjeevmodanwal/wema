import { Component, ViewChild } from "@angular/core";
import { NavController, ToastController, MenuController, NavParams, ModalController, AlertController } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import { Slides } from "ionic-angular";
import { AppState } from "../../AppStates";
import { App } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { DatePipe } from "../../../node_modules/@angular/common";
import { SelectionPage } from "../selection/selection";
import { ModalPage } from "../modal/modal";
//import { MenuController } from '../../../node_modules/ionic-angular/components/app/menu-controller';
import { MyAccountAddReviewPage } from '../my-account-add-review/my-account-add-review';
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  search: boolean = false;
  ServicesLogo = [];
  Colour: boolean;
  toggled: boolean;
  buttonColor: string;
  currentIndex: number;
  amit: any;
  Company_List: Object;
  PROVIDERSRECORD = [];
  providersdata = [];
  loginStatus: boolean;
  rootPage: any;
  public appState = AppState;
  recientlyviewd: any;
  dayAppointments: any;
  currentNavigatedDateDay: Date;
  currentDate = new Date();
  isAppointmentsEmpty: boolean;
  Appointments: any;
  providerpicture: string;
  companypicture: string;
  newarray = [];
  country = ["India", "United Kingdom"];
  viewddata: boolean;
  isRecientlyviewdEmpty: boolean = true;
  isProviderEmpty: boolean = true;
  Country: any;
  changeCountry1 = true;
  currencyList: string[];
  selectOptions: { cssClass: string };
  fromCheckedPage: any;

  constructor(
    public navCtrl: NavController,
    private menu: MenuController,
    private app: App,
    public navParams: NavParams,
    private datePipe: DatePipe,
    private apiProvider: ApiProvider,
    private toastCtrl: ToastController,
    private storage: Storage,
    public modalController: ModalController,
    private alertCtrl: AlertController
  ) {
    console.log('inside HomePage constructor');
    console.log(JSON.stringify(navParams.data));
    
    try{
      if(navParams.data != undefined || navParams.data != '' || navParams.data != null ){
        this.fromCheckedPage = navParams.data.data;
  
        if(this.fromCheckedPage != undefined || this.fromCheckedPage != '' || this.fromCheckedPage != null){
          if(this.fromCheckedPage.fromPage == 'memberCheckinSuccess'){
            // this.fn1579696934615(this.fromCheckedPage.checkedData);
            this.fn1580281586639(this.fromCheckedPage.checkedData);
          }
        }
      }
    }catch(e){
      console.log(e);
    }
    
    


    this.currentNavigatedDateDay = this.currentDate;
    if (AppState.UserCred != undefined) {
      AppState.PaymentGatewayId =
        AppState.UserCred.formvalues["country"] == "2" ? "4" : "3";
    }
  }
  @ViewChild("slide") slide: Slides;
  @ViewChild("slides") slides: Slides;
  //@ViewChild('slides1') slides1: Slides;
  ionViewDidLoad() {
    this.PROVIDERSRECORD = [];
    this.providersdata = [];
    this.getServices();
    this.getProviders();
    this.slideChanged();
    this.slide.freeMode = true;
    this.slides.freeMode = true;
    //this.slides1.freeMode=true
    this.providerpicture = AppConst.WEMA_DEV_ROOT + "images/person.jpg";
    this.companypicture = AppConst.WEMA_DEV_ROOT + "images/company.jpg";
    //console.log('in login status',AppState.UserCred)
    if (AppState.UserCred != undefined) {
      //console.log('in login status true')
      this.loginStatus = true;
      this.getAppointments();
    } else {
      //console.log('in login status false')
      this.menu.swipeEnable(false);
      this.menu.enable(false, "enable ");
      this.loginStatus = false;
    }
    // this.storage.remove('viewedList')
    this.storage.get("viewedList").then(data => {
      if (data != null) {
        this.viewddata = true;
        this.recientlyviewd = JSON.parse(data);
        console.log("================recently view=====================");
        console.log(this.recientlyviewd);
        var ourArray = this.recientlyviewd;
        ourArray = ourArray.filter(
          (value, index, array) =>
            !array.filter(
              (v, i) => JSON.stringify(value) == JSON.stringify(v) && i < index
            ).length
        );
        //console.log("============================ourArray======");
        //console.log(ourArray);
        this.recientlyviewd = ourArray;
        this.recientlyviewd.forEach(element => {
          if (element.listingtype != "") {
            //alert("ifff - "+element.listingtype);
            this.isRecientlyviewdEmpty = false;
          }
        });
        //console.log("============================ourArray======");
        //console.log("================recently view=====================");
      } else {
        this.viewddata = false;
        //console.log('in recently view data ',this.recientlyviewd)
      }
    });
  }
  ionViewDidEnter() {
    setTimeout(() => {
      //console.log('--------Country-----------',AppState.Country )
      this.Country = AppState.Country;
    }, 5000);
  }
  doRefresh(refresher) {
    this.ionViewDidLoad();
    //console.log('Begin async operation', refresher);
    setTimeout(() => {
      //console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  changeCountry() {
    //console.log("in change country ",this.Country)
    //  this.changeCountry1=true
    if (this.Country == "India") {
      //console.log('in if statement')
      AppState.Country = this.Country;
      // AppState.Country=this.Country
      AppState.CountryCode = "2";
    } else {
      //console.log('in else uk ')
      AppState.Country = this.Country;
      AppState.CountryCode = "1";
    }
  }
  viewCart() {
    this.navCtrl.push("CartPage");
  }
  async getServices() {
    var request = {
      auth: true,
      filterproperty: {
        dir: "DESC",
        offset: 0,
        orderby: "servicename",
        recordlimit: 50
      }
    };
    let response = await this.apiProvider
      .Post(AppConst.GET_SERVICES, request)
      .toPromise();
    //console.log(response['records'])
    this.ServicesLogo = response["records"];
    //console.log(this.ServicesLogo)
    // App.filter('strReplace', function () {
    //  return function (input, from, to) {
    //  input = input || '';
    //  from = from || '';
    //  to = to || '';
    //  return input.replace(new RegExp(from, 'g'), to);
    //  };
    // })
  }
  toggleSearch() {
    // if (this.search) {
    //   this.search = false;
    // } else {
    //   this.search = true;
    this.navCtrl.push("SearchpagePage", this.ServicesLogo);
  }
  ngAfterViewInit() {
    //console.log('you are  ngAfterViewInit')
    this.Country = AppState.Country;
  }
  Care_services() {
    //console.log('you are in care ')
    this.navCtrl.push("CarePage");
  }
  Health_services() {
    this.navCtrl.push("HealthPage");
  }
  AllProvider() {
    this.navCtrl.push("ProviderListPage");
  }
  async getProviders() {
    var countryid = "";
    if (AppState.UserCred != undefined) {
      if (AppState.UserCred.formvalues.hasOwnProperty("country")) {
        if (
          AppState.UserCred.formvalues["country"] == "1" ||
          AppState.UserCred.formvalues["country"] == "2"
        ) {
          countryid = AppState.UserCred.formvalues["country"];
        }
      }
    }
    var request = {
      auth: true,
      //set":0,"recordlimit":5,"orderby":"categoryorder","dir":"DESC"},auth:true}
      countryid: countryid,
      filterproperty: {
        dir: "DESC",
        offset: 0,
        orderby: "categoryorder",
        recordlimit: 5
      }
    };
    let response = await this.apiProvider
      .Post(AppConst.GET_COMPANY_LIST, request)
      .toPromise();
    //console.log(response)
    this.Company_List = response;
    //console.log(this.Company_List.type['provider'])
    this.Country = AppState.Country;
    for (let key in this.Company_List) {
      //console.log(this.Company_List[key].type)
      if (this.Company_List[key].type == "provider") {
        if (countryid == "") {
          if (this.Company_List[key].hasOwnProperty("details")) {
            var providerdetials = this.Company_List[key].details;
            if (providerdetials.hasOwnProperty("amount")) {
              var Inneramount = providerdetials.amount;
              if (parseInt(Inneramount) > 0) {
                this.PROVIDERSRECORD.push(this.Company_List[key]);
                this.isProviderEmpty = false;
              }
            }
          }
        } else {
          if (this.Company_List[key].hasOwnProperty("details")) {
            var providerdetials = this.Company_List[key].details;
            if (providerdetials.hasOwnProperty("providerdetails")) {
              var Innerproviderdetails = providerdetials.providerdetails;
              if (Innerproviderdetails.hasOwnProperty("country")) {
                var Inneramount = providerdetials.amount;
                if (
                  Innerproviderdetails.country == countryid &&
                  parseInt(Inneramount) > 0
                ) {
                  this.PROVIDERSRECORD.push(this.Company_List[key]);
                  this.isProviderEmpty = false;
                }
              }
            }
          }
        }
      }
      //console.log(this.Company_List[key])
      //console.log(response['records'])
      //this.ServicesLogo=response['records']
    }
    this.PROVIDERSRECORD = this.PROVIDERSRECORD.sort(function(a, b) {
      return b.companyid - a.companyid;
    });
    var counterprovider = 0;
    for (let i in this.PROVIDERSRECORD) {
      // console.log(this.PROVIDERSRECORD[i])
      //console.log(this.PROVIDERSRECORD[i].details)
      // if(this.PROVIDERSRECORD[i].companyid > 350)
      // {
      if (counterprovider < 10) {
        this.PROVIDERSRECORD[i]["details"]["companyid"] = this.PROVIDERSRECORD[
          i
        ].providercompanyid;
        this.PROVIDERSRECORD[i]["details"]["serviceid"] = this.PROVIDERSRECORD[
          i
        ].serviceid;
        this.PROVIDERSRECORD[i]["details"][
          "servicesoffered"
        ] = this.PROVIDERSRECORD[i].servicesoffered;
        this.providersdata.push(this.PROVIDERSRECORD[i].details);
        counterprovider++;
      }
      // }
      //console.log(this.providersdata)
      /* {
   for(let pro in this.PROVIDERSRECORD[i].details)
    {
      console.log(this.PROVIDERSRECORD[i].details[pro])
      this.providersdata.push(this.PROVIDERSRECORD[i].details[pro])
    }
  }*/
    }
    //console.log(this.providersdata)
  }
  showMovementReport(i) {
    /*console.log(i)
    this.buttonColor = '#13a89e';   
    this.toggled = this.toggled ? false : true;
*/
  }
  itemTapped1($event, amit) {
    //console.log($event)
    if ($event.type == "click") {
      this.buttonColor = "#13a89e";
    }
    //console.log(amit)
  }
  itemTapped2($event, amit) {
    //console.log($event)
    if ($event.type == "click") {
      this.buttonColor = "#13a89e";
    }
    //console.log(amit)
  }
  SlidersPage1() {
    this.navCtrl.push(SelectionPage);
  }
  clicked(event, item, i) {
    //console.log(item)
    //console.log(i)
    var x = document.querySelectorAll(
      ".slides > .swiper-container > .swiper-wrapper > .swiper-slide > .slide-zoom > div"
    );
    // console.log(x);
    for (var j = 0; j < x.length; j++) {
      x[j].classList.remove("class4");
      x[j].classList.remove("class3");
      x[j].classList.add("class1");
    }
    event.target.classList.add("class3"); // To ADD
    event.target.classList.remove("class1"); // To Remove
    event.target.classList.contains("class2"); // To check
    event.target.classList.toggle("class4"); // To toggle
    this.storage.remove("days");
    this.storage.remove("lat");
    this.storage.remove("lng");
    this.storage.remove("avaliability");
    this.storage.remove("Postcode");
    this.storage.remove("providertype");
    item["lat"] = "";
    item["lng"] = "";
    item["avaliability"] = "";
    item["days"] = "";
    item["Postcode"] = "";
    item["providertype"] = "";
    this.navCtrl.push("TabsPage", item);
  }
  servicesinfo(event, item, i) {
    //console.log(item)
  }
  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    //console.log('Current index is', this.currentIndex);
  }
  providerinfo(slide) {
    // console.log("inside providerinfo() | slide : " + JSON.stringify(slide));
    //this.app.getRootNav().push('ProviderInfoPage',  slide);
    this.navCtrl.push("ProviderInfoPage", slide);
  }
  LogOut() {
    this.openPage();
  }
  async openPage() {
    var loggedOut;
    {
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
          this.storage.clear();
          this.toastCtrl
            .create({
              message: "Logged out successfully",
              duration: 1000
            })
            .present();
          this.loginStatus = false;
          this.rootPage = HomePage;
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
          this.storage.clear();
          this.toastCtrl
            .create({
              message: "Logged out successfully",
              duration: 1000
            })
            .present();
          this.rootPage = HomePage;
        }
      }
    }
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
      // this.ionViewDidLoad()
    }
    return false;
    // this.ionViewDidLoad()
  }
  Favrouties() {
    this.navCtrl.push("FavouritePage");
  }
  Recently_List() {
    this.navCtrl.push("RecentlyVisitPage", this.recientlyviewd);
  }
  Mybooking() {
    //console.log("clicked")
    this.navCtrl.push("AppointmentsPage");
  }
  itemTapped3(item) {
    // console.log($event)
    if (item.listingtype == "company") {
      item["serviceid"] = "55";
      this.navCtrl.push("CompanyProfilePage", item);
      // this.navCtrl.push(CompanyProfilePage)
      // console.log(item)
    } else {
      item["serviceid"] = "55";
      this.navCtrl.push("ProviderInfoPage", item);
      // this.navCtrl.push(CompanyProfilePage)
      //console.log(item)
    }
  }
  /**
   * Get today's appointments
   */
  async getAppointments() {
    var request = {
      StartDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      EndDate: this.datePipe.transform(new Date(), "yyyy-MM-dd"),
      MemberId: AppState.UserCred["userid"]
      //  ProviderId: AppState.UserCred['userid'],
    };
    if (!AppState.IsWemaLife)
      request["CompanyId"] = AppState.UserCred.currentCompany.companyid;
    var response = await this.apiProvider
      .Post(AppConst.GET_APPOINTMENTS, request)
      .toPromise();
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
        if (element.status == "4") element["checkInText"] = "Check-out";
        else if (element.status == "5") element["checkInText"] = "Completed";
        else if (element.status == "3" || element.status == "8")
          element["checkInText"] = "Cancelled";
        else element["checkInText"] = "Check-in";
      });
    } else this.isAppointmentsEmpty = true;
  }
  /**
   * CheckIn
   * @param appointment
   */
  checkIn(appointment: any) {
    console.log('inside checkIn : appointment: '+JSON.stringify(appointment));
    if (appointment != null) {
      if (
        appointment.status == "5" ||
        appointment.status == "3" ||
        appointment.status == "8"
      )
        return;
      let data = {
        appointment: appointment,
        type: appointment.status == "4" ? "checkout" : "checkin"
      };
      this.navCtrl.push("QrcodePage", data);
    }
  }
  MyAccount() {
    this.navCtrl.push("MemberAccountPage");
  }
  login_tost() {
    this.toastCtrl
      .create({
        message: "Please login  to see favourites",
        duration: 1000
      })
      .present();
  }
  async testReviewFunctionality() {
    console.log('testReviewFunctionality');

    var data = {
      company_name: "Aveda Solutions",
      provider_name: "Sunil Joshi",
      image: "https://miro.medium.com/max/560/1*MccriYX-ciBniUzRKAUsAw.png",
      service: "yoga"
    };

    // const myModal = await this.modalController.create({
    //   component: ModalPage,
    //   cssClass: 'my-custom-modal-css',
    //   data: data
    // });
    // return await myModal.present();

    const myModal = this.modalController.create("ModalPage", { data: data });
    return myModal.present();
  }

  async fn1579696934615(checkedData) {
    console.log('inside fn1579696934615');

    let appointmentId = "";

    if(checkedData.id != undefined || checkedData.id != '' || checkedData.id != null){
      let tempAppointId = checkedData.id.split("_",2);
      appointmentId = tempAppointId[1];
    }

    var data = {
      companyid: checkedData.companyid,
      company_name: checkedData.companyname,
      provider_name: checkedData.providerdetails.firstname,
      image: checkedData.providerdetails.profilepic,
      service: checkedData.service,
      appointmentid: appointmentId
    };

    // const myModal = await this.modalController.create({
    //   component: ModalPage,
    //   cssClass: 'my-custom-modal-css',
    //   data: data
    // });
    // return await myModal.present();

    const myModal = this.modalController.create("ModalPage", { data: data });
    return myModal.present();
  }

  showAlertmessage(message){
    this.alertCtrl
      .create({
        title: 'Alert',
        message: message,
        buttons: ['OK']
      })
    .present();
  }

  fn1580281586639(checkedData){

    console.log('inside fn1580281586639');

    let appointmentId = "";

    if(checkedData.id != undefined || checkedData.id != '' || checkedData.id != null){
      let tempAppointId = checkedData.id.split("_",2);
      appointmentId = tempAppointId[1];
    }

    var data = {
      companyid: checkedData.companyid,
      company_name: checkedData.companyname,
      provider_name: checkedData.providerdetails.firstname,
      image: checkedData.providerdetails.profilepic,
      service: checkedData.service,
      appointmentid: appointmentId
    };

    this.alertCtrl
      .create({
        title: 'Success',
        message: 'Thanks !!  Your Booking Has been completed Successfully. Please Submit your valuable feedback!!!!',
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.navCtrl.push('MyAccountAddReviewPage',data);
            }
          }
        ]
      })
    .present();
  }
}
