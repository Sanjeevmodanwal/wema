import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController,
  AlertController,
  Events,
  Keyboard,
  ToastController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Slides, ModalController } from "ionic-angular";
import { HomePage } from "../home/home";
import { AppState } from "../../AppStates";
import { AppConst } from "../../AppConst";
import { LoadingController, Platform } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { ProviderDashboardPageModule } from "../provider-dashboard/provider-dashboard.module";
import { ProviderDashboardPage } from "../provider-dashboard/provider-dashboard";
import { PasswordPage } from "../password/password";
import { MemberSignupPage } from "../member-signup/member-signup";
import { ProviderSignupPage } from "../provider-signup/provider-signup";
import { BookAppointmentPage } from "../book-appointment/book-appointment";
import {
  NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult,
  NativeGeocoderOptions
} from "@ionic-native/native-geocoder";
import { SocialSharing } from "@ionic-native/social-sharing";
import { SumupPage } from "../sumup/sumup";
import { ModalPage } from "../modal/modal";
 import { MemberAccountPage } from '../../pages/member-account/member-account';

//import { Http } from '../../node_modules/@angular/http';
/**
 * Generated class for the MemberloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-memberlogin",
  templateUrl: "memberlogin.html"
})
export class MemberloginPage {
  @ViewChild(Slides) slides: Slides;
  pages: Array<{ title: string; component: any; icon: string }> = [];
  public type = "password";
  public showPass = false;
  LoginHeader: string;
  UserName: string = "";
  Password: string = "";
  Country: any;
  currentIndex: number;
  OtpActivate: boolean;
  ActiveUserId: string;
  public appstate: AppState;
  rootPage: any;
  providerlogin: boolean;
  data: any;
  country = ["India", "United Kingdom"];
  changeCountry1 = true;
  setData: any;
  bookingdata: any;
  showSlider: boolean;
  showdotsforlogin: boolean;
  saveUserId: boolean;
  constructor(
    public navCtrl: NavController,
    private nativeGeocoder: NativeGeocoder,
    private keyboard: Keyboard,
    private menu: MenuController,
    private apiProvider: ApiProvider,
    private platform: Platform,
    private events: Events,
    private storage: Storage,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private sharingVar: SocialSharing,
    private toastCtrl: ToastController,
    public modalController: ModalController
  ) {
    // this.slideChanged()
    this.getAddress();
    // console.log(navParams.data)
    this.bookingdata = navParams.data;
    //  console.log(this.bookingdata.PostCode)
  }
  ionViewDidLoad() {
   
    this.fn1575963531();
    this.storage.get("intro-done").then(done => {
      //  this.slides.lockSwipes(true);
      // console.log('in done page',done)
      if (done == true) {
        this.showSlider = false;
        this.showdotsforlogin = false;
        this.slides.lockSwipes(true);
        // this.slides.slideTo(2);
      }
      // this.slides.slideTo(2);
      if (!done) {
        this.storage.set("intro-done", true);
        this.showSlider = true;
        // console.log('in intro page')
        this.slides.slideTo(0);
      }
    });
    // console.log(JSON.stringify("AppState.Location.latitude"))
    // console.log(JSON.stringify(AppState.Location.latitude))
    // console.log('ionViewDidLoad SlidersPage',AppState.Country);
    // if(AppState.Country.name!=undefined)
    // {
    //   this.Country=AppState.Country.name
    // }
    // else
    // {
    //   console.log('in else')
    // }
    //
    //  //console.log(this.appstate.IsMember)
    // // this.Country='india'
    //  console.log('in member login page ',this.Country)
    this.getAddress();
    this.providerlogin = AppState.IsMember;
  }
  // }
  ionViewDidEnter() {
    this.getAddress();
  }
  getAddress() {
    if (AppState.Location != undefined) {
      // console.log('in get address page ',AppState.Location)
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
          // console.log('in search location',result[0].countryName)
          this.Country = result[0].countryName;
          AppState.Country = result[0].countryName;
          if (AppState.Country == "India") {
            AppState.CountryCode = "2";
          } else {
            AppState.CountryCode = "1";
          }
        })
        .catch((error: any) => console.log(error));
    } else {
      // alert('please allow location')
    }
  }
  slide = [
    {
      title: "We have got you in ",
      description: "If you want to change your location, click the tab below.",
      image: "assets/imgs/wemalife-slider-img.png",
      button: "Change country?"
    },
    {
      title: "Never Miss Anything",
      description:
        "Turn on your push notification and we’ll let you know when yo have an appointment coming up",
      image: "assets/imgs/wemalife-slider-img2.png",
      button: "Allow push notifications"
    }
  ];
  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    // console.log('Current index is', this.currentIndex);
    if (this.currentIndex == 2) {
      this.showdotsforlogin = false;
    }
    if (this.currentIndex == 1 || this.currentIndex == 0) {
      this.showdotsforlogin = true;
      // this.changeCountry1=false
    }
  }
  notification() {
    this.slides.slideNext();
  }
  changeCountry() {
    // console.log("in change country ",this.Country)
    //  this.changeCountry1=true
    if (this.Country == "India") {
      // console.log('in if statement')
      AppState.Country = this.Country;
      // AppState.Country=this.Country
      AppState.CountryCode = "2";
    } else {
      // console.log('in else uk ')
      AppState.Country = this.Country;
      AppState.CountryCode = "1";
    }
    // if(this.Country=="india")
    // {
    //   AppState.Country='2'
    // }
    // else{
    //   AppState.Country='1'
    // }
  }
  ionslide() {
    AppState.UserCred = undefined;
    this.menu.swipeEnable(false);
    this.navCtrl.setRoot(HomePage);
  }
  ionslide1() {
    this.slides.slideNext();
  }
  ionslide2() {
    this.slides.slideNext();
  }
  /**
   * User login button click handler
   */
 /* async login() {
    if (this.UserName == "" || this.Password == "") {
      this.alertCtrl
        .create({
          title: "Alert",
          message: "You have entered an invalid username or password !",
          buttons: ["OK"]
        })
        .present();
    } else {
     // alert("me");
      var userCred = await this.getUserCredential();
      if (userCred != null) {
        await this.getCurrentUserProfile(userCred);
        // console.log('userCred: '+ JSON.stringify(userCred));
        this.storage.set("UserCred", JSON.stringify(AppState.UserCred));
        var publishMsg = AppState.IsMember
          ? "memberloggedin"
          : "providerloggedin";
        if (AppState.IsMember && AppState.UserCred.usertypeid == "4") {
          // if (AppState.UserCred.companies != null && AppState.UserCred.companies.length > 1 && AppState.UserCred.source.toLowerCase() == "wemaplus") {
          if (this.bookingdata.PostCode != undefined) {
            //  AppState.IsMultipleCompay = true;
            // AppState.MenuEnabled=false;
            //   this.events.publish('setRoot',HomePage);
            // if(this.navParams.data!=undefined)
            // {
            // console.log('in loop HomePage ')
            // this.navCtrl.setRoot(HomePage)
            // }
            // else (this.navParams.data!=undefined)
            // {
            // alert('in loop BookAppointmentPage 1111111-nsp')
            this.fn1575963183();
            this.navCtrl.setRoot(BookAppointmentPage, this.navParams.data);
            return false;
            //  }
          }
          //  console.log('in loop publishMsg ')
          // this.events.publish('setRoot', HomePage);
          else this.events.publish(publishMsg);
          this.fn1575963183();
          this.navCtrl.setRoot(HomePage);
        } else if (!AppState.IsMember && AppState.UserCred.usertypeid == "3") {
          if (
            AppState.UserCred.companies != null &&
            AppState.UserCred.companies.length > 1 &&
            AppState.UserCred.source.toLowerCase() == "wemaplus"
          ) {
            AppState.IsMultipleCompay = true;
            AppState.MenuEnabled = false;
            // this.events.publish('setRoot', HomePage);
            //  console.log('in the scussesful')
            this.fn1575963183();
            this.navCtrl.setRoot("HomePage");
          } else this.events.publish(publishMsg);
          this.fn1575963183();
          this.navCtrl.setRoot("ProviderDashboardPage");
        }
      }
    }
  } 

  /**
   * Login the user & get user credential
   */
  async getUserCredential(): Promise<any> {
    var request = {
      emailid: this.UserName,
      password: this.Password,
      devicecode: AppState.DeviceToken,
      DeviceType: this.platform.is("android") ? "1" : "2",
      availability: false
    };
    var userCred = await this.apiProvider
      .Post(AppConst.LOGIN, request)
      .toPromise();
      console.log("userCred",userCred);
    if (
      userCred != null &&
      userCred.hasOwnProperty("message") &&
      userCred["message"] != "" &&
      userCred["message"].toLowerCase() == "mobile number not verified"
    ) {
      AppState.IsWemaLife = userCred["source"] == "wemaplus" ? false : true;
      this.ActiveUserId = userCred["userid"];
      this.OtpActivate = true;
      return null;
    } else if (
      userCred != null &&
      (userCred.hasOwnProperty("islocked") || userCred["islocked"] == "") &&
      userCred["islocked"].toLowerCase() == "true"
    ) {
      this.alertCtrl
        .create({
          title: "PLEASE CONTACT THE SUPPORT",
          message: "Locked",
          buttons: ["OK"]
        })
        .present();
      return null;
    } else if (
      AppState.IsMember &&
      userCred.hasOwnProperty("records") &&
      userCred["records"].length > 0 &&
      userCred["records"]["0"]["usertypeid"] == "3"
    ) {
      this.alertCtrl
        .create({
          message: "This login is for provider",
          buttons: ["OK"]
        })
        .present();
      return null;
    } else if (
      !AppState.IsMember &&
      userCred.hasOwnProperty("records") &&
      userCred["records"].length > 0 &&
      userCred["records"]["0"]["usertypeid"] != "3"
    ) {
      var type =
        userCred["records"]["0"]["usertypeid"] == "4"
          ? "Member"
          : "Friend/Family";
      this.alertCtrl
        .create({
          // message: 'This login is for' +  type,
          message: "This login is for member",
          buttons: ["OK"]
        })
        .present();
      return null;
    } else if (
      AppState.IsMember &&
      userCred.hasOwnProperty("records") &&
      userCred["records"]["0"]["companies"]["0"]["awaiting"] == "1"
    ) {
      this.alertCtrl
        .create({
          message: "Awaiting for Manager Approval",
          buttons: ["OK"]
        })
        .present();
      return null;
    } else if (userCred != null && userCred["status"]) {
      if (userCred["records"] != null && userCred["records"].length > 0) {
        AppState.IsWemaLife =
          userCred["records"]["0"]["source"] == "wemaplus" ? false : true;
        this.ActiveUserId = userCred["records"]["0"]["userid"];
        AppState.UserCred = userCred["records"]["0"];
        /*this.apiKey = AppState.UserCred['key']
        /*AppState.UserCred['showLife'] = userCred['showlife'];
        AppState.UserCred['switchMainUserId'] = AppState.UserCred['userid'];
        AppState.UserCred['userLifeCompanyId'] = AppState.UserCred['companyid'];
        AppState.UserCred['currentCompany'] = AppState.UserCred.companies['0'];
        let allWemalifeCompanies = AppState.UserCred['companies'].filter(c => c.wemalife == 1 && c.companywemalife == 1);
        let allWemaLife = allWemalifeCompanies.length == AppState.UserCred.companies.length;
        if (AppState.IsMember && allWemaLife) {
          AppState.UserCred['currentCompanyId'] = "1";
          AppState.UserCred['source'] = "wemalife";
          console.log(AppState.UserCred);
        }
        else if (AppState.IsMember && AppState.UserCred.companies.length == 1 && AppState.IsWemaLife) {
          var singleCompany = AppState.UserCred.companies['0'];
          AppState.IsWemaLife = (singleCompany.wemaplus == 1 && singleCompany.companywemalife == 1) ? false : true;
          AppState.CurrentCompany = singleCompany;
          AppState.UserCred['currentCompanyId'] = singleCompany.companyid;
          console.log(AppState.UserCred);
        }
        else {
          var defaultCompany = AppState.UserCred.companies['0'];
          AppState.CurrentCompany = defaultCompany;
          AppState.UserCred['currentCompanyId'] = defaultCompany.companyid;
          console.log(AppState.UserCred);
        }*/

        console.log("record and",userCred["records"]["0"]);
        return userCred["records"]["0"];
      }
    } else {
      this.alertCtrl
        .create({
          message: "Either the Email ID or Password entered is incorrect.",
          buttons: ["OK"]
        })
        .present();
      return null;
    }
  }
  async getCurrentUserProfile(user: any) {
    var filters = Array<{
      fieldname: string;
      fieldvalue: string;
      operators: string;
    }>();
    filters.push({
      fieldname: "userid",
      fieldvalue: user["userid"],
      operators: "Equal"
    });
    if (!AppState.IsWemaLife)
      filters.push({
        fieldname: "companyid",
        fieldvalue: user["companies"]["0"]["companyid"],
        operators: "Equal"
      });
    let request: any;
    // console.log(AppState)
    if (AppState.IsMember)
      request = {
        app: true,
        auth: true,
        filter: filters,
        MemberId: user["userid"],
        filterproperty: null,
        CompanyId: null
      };
    else
      request = {
        app: true,
        auth: true,
        filter: filters,
        filterproperty: {
          offset: 0,
          orderby: "preferences",
          recordlimit: 0
        }
      };
    let response = AppState.IsMember
      ? await this.apiProvider
          .Post(AppConst.GET_USER_PROFILE, request)
          .toPromise()
      : await this.apiProvider
          .Post(AppConst.GET_PROVIDER_PROFILE, request)
          .toPromise();
    if (
      response != null &&
      response.hasOwnProperty("records") &&
      response["records"].length > 0
    ) {
      AppState.UserCred = response["records"]["0"];
      AppState.UserCred["key"] = user["key"];
      AppState.UserCred["showLife"] = user["showlife"];
      AppState.UserCred["switchMainUserId"] = AppState.UserCred["userid"];
      AppState.UserCred["userLifeCompanyId"] = AppState.UserCred["companyid"];
      AppState.UserCred["companies"] = user.companies;
      AppState.UserCred["currentCompany"] = user.companies["0"];
      AppState.UserCred["source"] = user["source"];
      let allWemalifeCompanies = user["companies"].filter(
        c => c.wemalife == 1 && c.companywemalife == 1
      );
      let allWemaLife = allWemalifeCompanies.length == user.companies.length;
      // if(AppState.IsMember=true)
      // {
      //   this.navCtrl.setRoot(HomePage)
      // }
      // else if(AppState.IsMember=false)
      // {
      //   this.navCtrl.setRoot(ProviderDashboardPage)
      // }
      if (AppState.IsMember && allWemaLife) {
        AppState.CurrentCompany = user.companies["0"];
        AppState.UserCred["currentCompany"] = user.companies["0"];
        AppState.UserCred["currentCompanyId"] = "1";
        AppState.UserCred["source"] = "wemalife";
      } else if (
        AppState.IsMember &&
        user.companies.length == 1 &&
        AppState.IsWemaLife
      ) {
        var singleCompany = user.companies["0"];
        AppState.IsWemaLife =
          singleCompany.wemaplus == 1 && singleCompany.companywemalife == 1
            ? false
            : true;
        AppState.CurrentCompany = singleCompany;
        AppState.UserCred["currentCompany"] = singleCompany;
        AppState.UserCred["currentCompanyId"] = singleCompany.companyid;
      } else {
        var defaultCompany = user.companies["0"];
        AppState.CurrentCompany = defaultCompany;
        AppState.UserCred["currentCompany"] = defaultCompany;
        AppState.UserCred["currentCompanyId"] = defaultCompany.companyid;
      }
    }
  }
  /**
   * Password show toggle
   */
  showPassword() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }
  Forgotpass() {
    this.navCtrl.push("PasswordPage");
  }
  memberSignup() {
    this.navCtrl.push("MemberSignupPage");
  }
  providerSignup() {
    this.navCtrl.push("ProviderSignupPage");
  }
  closeKeyboard() {
    // console.log('key board close ')
    this.keyboard.close();
  }
  fn1575961111() {
    //function to remember username & password
    //console.log('inside fn1575961111()');
    this.saveUserId = true;
    //console.log("saveUserId : "+this.saveUserId);
  }
  fn1575963183() {
    //function to set remeberUserId
    //console.log('inside function fn1575963183');
    if (this.saveUserId == true) {
      this.storage.set("remeberUserId", this.saveUserId);
      this.storage.set("userId", this.UserName);
    }
    this.storage.get("remeberUserId").then(val => {
      //console.log('remeberUserId is', val);
    });
    this.storage.get("userId").then(val => {
      //console.log('userId is', val);
    });
  }
  fn1575963531() {
    //function to get remeberUserId
    //console.log('inside function fn1575963531');
    this.storage.get("remeberUserId").then(val => {
      // console.log('remeberUserId is', val);
      if (val == true) {
        this.saveUserId = val;
        //console.log('saveUserId: '+this.saveUserId);
        this.storage.get("userId").then(userId => {
          // console.log('userId is', userId);
          if (userId !== null || userId !== undefined) {
            this.UserName = userId;
            // console.log('UserName: '+this.UserName);
          }
        });
      }
    });
    this.storage.get("remeberUserId").then(val => {
      //console.log('remeberUserId is', val);
    });
    this.storage.get("userId").then(val => {
      //console.log('userId is', val);
    });
  }
  testSumUp() {
    this.navCtrl.push("SumupPage");
  }
  async testReviewFunctioality() {
    console.log("inside test review functionality");
    var data = {
      company_name: "Aveda Solutions",
      provider_name: "Sunil Joshi",
      image: "https://miro.medium.com/max/560/1*MccriYX-ciBniUzRKAUsAw.png",
      service: "yoga"
    };
    const myModal = this.modalController.create("ModalPage", { data: data });
    myModal.present();
  }

  login(){ 
    // AppState.IsMember=true;
    // this.navCtrl.push('MemberloginPage');
    if (this.UserName == "" || this.Password == "") {
          this.alertCtrl
            .create({
              title: "Alert",
              message: "You have entered an invalid username or password !",
              buttons: ["OK"]
            })
            .present();
        } else {
          var request = {
            emailid: this.UserName,
            password: this.Password,
          };
          this.apiProvider.Post(AppConst.SIGNIN, request).subscribe((res: any) => {
            if(res.status==true){
              console.log("under",res.records[0]);
              AppState.IsWemaLife =res.records[0].source == "wemaplus" ? false : true;
              this.ActiveUserId = res.records[0].userid;
              AppState.UserCred = res.records[0];
              AppState.Country=res.records[0].country;
              this.storage.set("UserCred", JSON.stringify(AppState.UserCred));
              var publishMsg = AppState.IsMember
                ? "memberloggedin"
                : "providerloggedin";

              this.events.publish(publishMsg);
              // this.pages.push({
              //   title: "My Account ",
              //   component: "MemberAccountPage",
              //   icon: "assets/icon/switch_acc.png"
              // });
               AppState.IsMember=true;
               this.rootPage = HomePage;
              this.fn1575963183();
            //  this.navCtrl.setRoot(MemberAccountPage);
            //  this.events.publish('setRoot', HomePage);
              // this.ActiveUserId = res.records[0].userid;
              // AppState.UserCred= res.records[0];
              // console.log("UserCred",AppState.UserCred);
             // this.navCtrl.push(HomePage)
            }else if(res.status==false){
              this.alertCtrl
              .create({
                title: "Alert",
                message:res.message,
                buttons: ["OK"]
              })
              .present();
            }
          });
      }
  }
}
