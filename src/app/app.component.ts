import { Component, ViewChild } from "@angular/core";
import {
  Nav,
  Platform,
  Events,
  ToastController,
  AlertController,
  NavController 
} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HomePage } from "../pages/home/home";
import { Geolocation } from "@ionic-native/geolocation";
import { AppState } from "../AppStates";
import {
  NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult,
  NativeGeocoderOptions
} from "@ionic-native/native-geocoder";
import { Http } from "../../node_modules/@angular/http";
import { Storage } from "@ionic/storage";
import { AppConst } from "../AppConst";
import { ApiProvider } from "../providers/api/api";
import { NetworkProvider } from "../providers/network/network";
//import { ProviderDashboardPage } from '../pages/provider-dashboard/provider-dashboard';
// import { SelectionPage } from '../pages/selection/selection';
 import { MemberAccountPage } from '../pages/member-account/member-account';
 import { ProfilePage } from '../pages/profile/profile';
// import { ChatPage } from '../pages/chat/chat';
//import { FCM } from "@ionic-native/fcm";
import { Firebase } from '@ionic-native/firebase/ngx';
import { SelectionPage } from "../pages/selection/selection";
import { ModalPage } from '../pages/modal/modal';
//import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyCcOoguuZDaQYGEBo-SDxcZwcun-CKampQ",
  authDomain: "wemai-1c32d.firebaseapp.com",
  databaseURL: "https://wemai-1c32d.firebaseio.com",
  projectId: "wemai-1c32d",
  storageBucket: "wemai-1c32d.appspot.com",
  messagingSenderId: "586464708786"
};
// import { FCM } from '@ionic-native/fcm/ngx';
declare var google: any;
@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: NavController;
  rootPage: any = SelectionPage;
  pages: Array<{ title: string; component: any; icon: string }> = [];
  lat: any;
  long: any;
  countaryname: any;
  // pages: Array<{ title: string, component: any, icon: string }> = [];
  ProfileName: string;
  ProfilePic: string;
  Company: string;
  FooterVisible: boolean = false;
  TabSelectedIndex: number = 0;
  constructor(
    public http: Http,
    private nativeGeocoder: NativeGeocoder,
    private events: Events,
    private toastCtrl: ToastController,
    private apiProvider: ApiProvider,
    private networkProvider: NetworkProvider,
    private storage: Storage,
    private _GEOCODE: NativeGeocoder,
    private alertCtrl: AlertController,
    private geolocation: Geolocation,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.platform.ready().then(() => {
      //console.log('platform is ready ')
      this.networkProvider.initializeNetworkEvents();
      //this.statusBar.overlaysWebView(true);
      this.statusBar.styleLightContent();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //  this.statusBar.styleDefault();
      this.hideSplashScreen();
      this.getLocation();
      this.setStorage();
      this.SetPushNotification();
      this.subscribeEvents();
      this.logoutApp();
     // firebase.initializeApp(config);
     // this.firebase.setConfigSettings(config)
    });
  }
  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }
  /**
   * Get current location of the user
   */
  getLocation() {
    let options = {
      timeout: 10000,
      enableHighAccuracy: true
    };
    this.geolocation
      .getCurrentPosition()
      .then(position => {
        AppState.Location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        //console.log(AppState.Location);
        this.getAddress();
      })
      .catch(error => {
        //console.log('Error getting location', error);
      });
    /*let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     this.alertCtrl.create({
       message:"watch position:"+JSON.stringify(data)
     }).present();
    });*/
  }
  getAddress() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    if (
      AppState.Location.latitude != undefined &&
      AppState.Location.longitude != undefined
    ) {
      this.nativeGeocoder
        .reverseGeocode(
          AppState.Location.latitude,
          AppState.Location.longitude,
          options
        )
        .then((result: NativeGeocoderReverseResult[]) => {
          //console.log('in search location',result[0].countryName)
          AppState.Country = result[0].countryName;
        })
        .catch((error: any) => console.log(error));
    } else {
      alert("please allow location");
    }
    // this.nativeGeocoder.forwardGeocode('Berlin', options)
    //   .then((coordinates: NativeGeocoderForwardResult[]) => console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude))
    //   .catch((error: any) => console.log(error));
  }
  SetPushNotification() {
    //   this.firebase.getToken()
    //   .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
    //   .catch(error => console.error('Error getting token', error));
    // this.firebase.onNotificationOpen()
    //    .subscribe(data => console.log(`User opened a notification ${data}`));
    // this.firebase.onTokenRefresh()
    //   .subscribe((token: string) => console.log(`Got a new token ${token}`));
    try{
      this.getToken();
    } catch(e){
      console.log(e);
    }
    
  }
  getToken() {
    var type;
    var user_id;
    (<any>window).FirebasePlugin.getToken(
      token => {
        if (this.platform.is("ios")) {
          (<any>window).FirebasePlugin.grantPermission();
        }
        //console.log('get token from firebaseplugin');
        //console.log(token);
        AppState.DeviceToken = token;
        if (localStorage.getItem("parentsId")) {
          user_id = localStorage.getItem("parentsId");
          type = "parent";
        } else if (localStorage.getItem("id")) {
          user_id = localStorage.getItem("id");
          type = "kids";
        }
        let data = { Firebase_regId: token, user_id: user_id, type: type };
        //  this.rest.addData("updateToken",data).subscribe(response =>{
        //          console.log(response)
        //  },
        //  error =>{
        //    console.error(error);
        //  }
        //  )
      },
      function(error) {
        console.error(error);
      }
    );
  }
  subscribeToPushNotificationEvents(): void {
    var text = "";
    var title = "";
    // Handle incoming notifications
    if (localStorage.getItem("token")) {
      (<any>window).FirebasePlugin.onNotificationOpen(
        notification => {
          //console.log("before tap notification " +localStorage.getItem('token'));
          (<any>window).FirebasePlugin.setBadgeNumber(10);
          //console.log(notification);
          if (notification.page == "RefrralhistoryPage") {
            text = "Verify";
          } else {
            text = "Ok";
          }
          if (!notification.tap) {
            //console.log("check current page  name "+this.nav.getActive().name);
            if (notification.page !== "HitherePage") {
              if (notification.page !== "PalrequestPage") {
                title = notification.subtitle;
              } else {
                title = notification.title;
              }
              //this.navCtrl.push(notification.page);
              (<any>window).FirebasePlugin.setBadgeNumber(10);
              let notificationAlert = this.alertCtrl.create({
                title: title,
                message: notification.body,
                cssClass: "icon-color",
                buttons: [
                  {
                    text: text,
                    role: "submit",
                    cssClass: "icon-color button-shar",
                    handler: data => {
                      //  this.nav.setRoot('MenuPage');
                      this.nav.push(notification.page);
                      //console.log(" tap notification " +localStorage.getItem('token'));
                    }
                  },
                  {
                    text: "Close",
                    role: "cancel",
                    cssClass: "icon-color button-shar",
                    handler: () => {
                      //console.log('Cancel clicked');
                    }
                  }
                ],
                enableBackdropDismiss: false
              });
              notificationAlert.present();
            }
          } else {
            // this.navCtrl.push(notification.page);
            //console.log(notification.page)
            //localStorage.setItem('type', notification.page);
            //  this.nav.setRoot('MenuPage');
            this.rootPage = notification.page;
          }
        },
        error => {
          console.error("Error getting the notification", error);
        }
      );
    }
    /*  else
      {
       (<any>window).FirebasePlugin.unsubscribe(success =>console.log(success))
         (<any>window).FirebasePlugin.unregister(success =>{
           console.log("unregister push " +success)
         })
      } */
  }
  // setPushNotification() {
  //   this.fcm.subscribeToTopic('all');
  //   this.fcm.getToken().then(token => {
  //     AppState.DeviceToken = token;
  //     this.toastCtrl.create({
  //       message: token,
  //       duration: 1000
  //     }).present();
  //   });
  //   this.fcm.onNotification().subscribe(data => {
  //     alert('message received')
  //     if (data.wasTapped) {
  //       console.info("Received in background");
  //     } else {
  //       console.info("Received in foreground");
  //     };
  //   });
  //   this.fcm.onTokenRefresh().subscribe(token => {
  //     AppState.DeviceToken = token;
  //     this.toastCtrl.create({
  //       message: token,
  //       duration: 1000
  //     }).present();
  //   });
  // }
  //}
  // subscribeEvents(){
  //   {
  //     this.events.subscribe("memberloggedin", async () => {
  //       this.ProfileName = AppState.UserCred['firstname'] + ' ' + AppState.UserCred['lastname'];
  //       this.ProfilePic = AppState.UserCred['avatar'] == null || AppState.UserCred['avatar'] == '' ? "assets/imgs/userred.png" : AppState.UserCred['avatar'];
  //       this.Company = AppState.UserCred['wemalife'] == '1' ? "WemaLife" : AppState.UserCred['currentCompany']['companyname'];
  //    //   this.pages = [];
  //       if (!AppState.IsWemaLife) {
  //         if (AppState.IsMember && AppState.UserCred['usertypeid'] == "4") {
  //           console.log('we are in member login ')
  //      // used for an example of ngFor and navigation
  //     this.pages = [
  //       { title: 'Home', component: HomePage,   icon: "assets/icon/master_myprofile.png" },
  //       { title: 'Member Account', component: MemberAccountPage, icon: "assets/icon/master_dashboard.png" },
  //       { title: 'Logout', component: null, icon: "assets/icon/master_logout.png" }
  //     ];
  //         //   this.pages.push({ title: 'Dashboard', component: TabsPage, icon: "assets/icon/master_dashboard.png" });
  //         //   this.pages.push({ title: 'Switch Account', component: SwitchAccountPage, icon: "assets/icon/switch_acc.png" });
  //         //   //if (AppState.UserCred.hasOwnProperty('frienduserid') && AppState.UserCred['frienduserid'] == '0' && AppState.UserCred['companies'].length > 1)
  //         //   //  this.pages.push({ title: 'Switch Company', component: CompanySelectionPage, icon: "assets/icon/switch_acc.png" });
  //         //   this.pages.push({ title: 'Add Company', component: AddCompanyPage, icon: "assets/icon/master_company.png" });
  //         //   this.pages.push({ title: 'Friends/Family', component: FriendsFamilyPage, icon: "assets/icon/master_friendsfamily.png" });
  //         //   this.pages.push({ title: 'My Profile', component: ProfilePage, icon: "assets/icon/master_myprofile.png" });
  //         //   this.pages.push({ title: 'Preferences', component: PreferencePage, icon: "assets/icon/master_preference.png" });
  //         //   this.pages.push({ title: 'Subscriptions', component: SubscriptionPage, icon: "assets/icon/master_subscription.png" });
  //         //   this.pages.push({ title: 'Reports', component: MemberReportPage, icon: "assets/icon/reportblue.png" });
  //         //   this.pages.push({ title: 'Inbox', component: EmailPage, icon: "assets/icon/master_inbox.png" });
  //         //   this.pages.push({ title: 'Visit History', component: MemberVisitHistoryPage, icon: "assets/icon/master_Latestvisits.png" });
  //         //  // this.pages.push({ title: 'Chat', component: ChatPage, icon: "assets/icon/chatgreen.png" });
  //         //   //this.pages.push({ title: 'Contact Us', component: ProfilePage, icon: "assets/icon/master_edit_address.png" });
  //         //   this.pages.push({ title: 'Logout', component: null, icon: "assets/icon/master_logout.png" });
  //         }
  //       else {
  //         if (AppState.IsMember && AppState.UserCred['usertypeid'] == "4") {
  //           this.pages = [
  //             { title: 'Home', component: HomePage,   icon: "assets/icon/master_myprofile.png" },
  //             { title: 'Member Account', component: MemberAccountPage, icon: "assets/icon/master_dashboard.png" },
  //             { title: 'Logout', component: null, icon: "assets/icon/master_logout.png" }
  //           ];
  //         //   this.pages.push({ title: 'Dashboard', component: TabsPage, icon: "assets/icon/master_dashboard.png" });
  //         //   this.pages.push({ title: 'Switch Account', component: SwitchAccountPage, icon: "assets/icon/switch_acc.png" });
  //         //   //if (AppState.UserCred.hasOwnProperty('frienduserid') && AppState.UserCred['frienduserid'] == '0' && AppState.UserCred['companies'].length > 1)
  //         //   //  this.pages.push({ title: 'Switch Company', component: CompanySelectionPage, icon: "assets/icon/switch_acc.png" });
  //         //   this.pages.push({ title: 'Add Company', component: AddCompanyPage, icon: "assets/icon/master_company.png" });
  //         //   this.pages.push({ title: 'Friends/Family', component: FriendsFamilyPage, icon: "assets/icon/master_friendsfamily.png" });
  //         //   this.pages.push({ title: 'My Profile', component: ProfilePage, icon: "assets/icon/master_myprofile.png" });
  //         //   this.pages.push({ title: 'Preferences', component: PreferencePage, icon: "assets/icon/master_preference.png" });
  //         //   this.pages.push({ title: 'Subscriptions', component: SubscriptionPage, icon: "assets/icon/master_subscription.png" });
  //         //   this.pages.push({ title: 'Reports', component: MemberReportPage, icon: "assets/icon/reportblue.png" });
  //         //   this.pages.push({ title: 'Inbox', component: EmailPage, icon: "assets/icon/master_inbox.png" });
  //         //   this.pages.push({ title: 'Visit History', component: MemberVisitHistoryPage, icon: "assets/icon/master_Latestvisits.png" });
  //         //  // this.pages.push({ title: 'Chat', component: ChatPage, icon: "assets/icon/chatgreen.png" });
  //         //   this.pages.push({ title: 'Logout', component: null, icon: "assets/icon/master_logout.png" });
  //         }
  //       }
  //     }
  //       if (AppState.IsMember && AppState.UserCred.usertypeid == '4') {
  //         if (AppState.UserCred.companies != null && AppState.UserCred.companies.length > 1 && AppState.UserCred.source.toLowerCase() == "wemaplus"){
  //           AppState.IsMultipleCompay=true;
  //           this.rootPage= SelectionPage;
  //         }
  //         else
  //           this.rootPage = HomePage;
  //       }
  //       else
  //       console.log('we are in member login ')
  //       this.rootPage = HomePage;
  //     });
  //     this.events.subscribe("providerloggedin", async () => {
  //       this.ProfileName = AppState.UserCred['firstname'] + ' ' + AppState.UserCred['lastname'];
  //       this.ProfilePic = AppState.UserCred['avatar'] == null || AppState.UserCred['avatar'] == '' ? "assets/imgs/userred.png" : AppState.UserCred['avatar'];
  //       this.Company = AppState.UserCred['currentCompany']['companyname'];
  //      this.pages = [];
  //       if (!AppState.IsWemaLife) {
  //         if (!AppState.IsMember && AppState.UserCred['usertypeid'] == "3") {
  //           console.log('in providers menue')
  //           this.pages = [
  //             // { title: 'Home', component: HomePage,   icon: "assets/icon/master_myprofile.png" },
  //             { title: 'Provider dashbord', component: ProviderDashboardPage, icon: "assets/icon/master_dashboard.png" },
  //             { title: 'Logout', component: null, icon: "assets/icon/master_logout.png" }
  //           ];
  //         //   this.pages.push({ title: 'Dashboard', component: TabsPage, icon: "assets/icon/master_dashboard.png" });
  //         //   if (AppState.UserCred['companies'].length > 1) {
  //         //     this.pages.push({ title: 'Switch Company', component: EmailPage, icon: "assets/icon/switch_acc.png" });
  //         //   }
  //         //   this.pages.push({ title: 'Add Company', component: AddCompanyPage, icon: "assets/icon/master_company.png" });
  //         //   this.pages.push({ title: 'My Profile', component: ProfilePage, icon: "assets/icon/master_myprofile.png" });
  //         //   this.pages.push({ title: 'Expenses', component: BillsPage, icon: "assets/icon/master_bills.png" });
  //         //   this.pages.push({ title: 'Mileage', component: MileagePage, icon: "assets/icon/master_mileage.png" });
  //         //   this.pages.push({ title: 'Visit History', component: MemberVisitHistoryPage, icon: "assets/icon/master_Latestvisits.png" });
  //         //   this.pages.push({ title: 'Emergency Alarm', component: EmergencyAlarmPage, icon: "assets/icon/alarm.png" });
  //         //   this.pages.push({ title: 'Bill Report', component: ProviderBillingPage, icon: "assets/icon/master_providerbillreport.png" });
  //         //   this.pages.push({ title: 'Reports', component: ProviderReportPage, icon: "assets/icon/reportblue.png" });
  //         //   this.pages.push({ title: 'Inbox', component: EmailPage, icon: "assets/icon/master_inbox.png" });
  //         //   this.pages.push({ title: 'Chat', component: ChatPage, icon: "assets/icon/chatgreen.png" });
  //         //   //this.pages.push({ title: 'Contact Us', component: ProfilePage, icon: "assets/icon/master_edit_address.png" });
  //         //   this.pages.push({ title: 'Logout', component: null, icon: "assets/icon/master_logout.png" });
  //         // }
  //       }
  //       else {
  //         if (!AppState.IsMember && AppState.UserCred['usertypeid'] == "3") {
  //           console.log('in providers menue')
  //           this.pages = [
  //             { title: 'Provider dashbord', component: ProviderDashboardPage, icon: "assets/icon/master_dashboard.png" },
  //             { title: 'Logout', component: null, icon: "assets/icon/master_logout.png" }
  //           ];
  //         //   this.pages.push({ title: 'Dashboard', component: TabsPage, icon: "assets/icon/master_dashboard.png" });
  //         //   if (AppState.UserCred['companies'].length > 1) {
  //         //     this.pages.push({ title: 'Switch Company', component: EmailPage, icon: "assets/icon/switch_acc.png" });
  //         //   }
  //         //   this.pages.push({ title: 'Add Company', component: AddCompanyPage, icon: "assets/icon/master_company.png" });
  //         //   this.pages.push({ title: 'My Profile', component: ProfilePage, icon: "assets/icon/master_myprofile.png" });
  //         //   this.pages.push({ title: 'Expenses', component: BillsPage, icon: "assets/icon/master_bills.png" });
  //         //   this.pages.push({ title: 'Mileage', component: MileagePage, icon: "assets/icon/master_mileage.png" });
  //         //   this.pages.push({ title: 'Visit History', component: MemberVisitHistoryPage, icon: "assets/icon/master_Latestvisits.png" });
  //         //   this.pages.push({ title: 'Emergency Alarm', component: EmergencyAlarmPage, icon: "assets/icon/alarm.png" });
  //         //   this.pages.push({ title: 'Bill Report', component: ProviderBillingPage, icon: "assets/icon/master_providerbillreport.png" });
  //         //   this.pages.push({ title: 'Reports', component: ProviderReportPage, icon: "assets/icon/reportblue.png" });
  //         //   this.pages.push({ title: 'Inbox', component: EmailPage, icon: "assets/icon/master_inbox.png" });
  //         //   this.pages.push({ title: 'Chat', component: ChatPage, icon: "assets/icon/chatgreen.png" });
  //         //   this.pages.push({ title: 'Logout', component: null, icon: "assets/icon/master_logout.png" });
  //         // }
  //       }
  //     }
  //   }
  //       /*if (!AppState.IsMember && AppState.UserCred.usertypeid == '3') {
  //         if (AppState.UserCred.companies != null && AppState.UserCred.companies.length > 1 && AppState.UserCred.source.toLowerCase() == "wemaplus"){
  //           AppState.IsMultipleCompay=true;
  //            this.rootPage= CompanySelectionPage;
  //         }
  //         else
  //           this.rootPage = TabsPage;
  //       }
  //       else*/
  //     console.log('you are in provider login')
  //       this.rootPage = ProviderDashboardPage;
  //     });
  //     this.events.subscribe('updatecart', (updatecart: boolean) => {
  //       if (updatecart)
  //         this.createCartTimer();
  //       else {
  //         AppState.Second = 0;
  //         AppState.CartCount = 0;
  //         this.emptyCart();
  //       }
  //     });
  //     this.events.subscribe('updateuser', () => {
  //       this.ProfileName = AppState.UserCred['firstname'] + ' ' + AppState.UserCred['lastname'];
  //       this.ProfilePic = AppState.UserCred['avatar'] == null || AppState.UserCred['avatar'] == '' ? "assets/imgs/userred.png" : AppState.UserCred['avatar'];
  //     });
  //     this.events.subscribe("setRoot", (page: any) => {
  //       this.rootPage = page;
  //     });
  //     this.events.subscribe("footervisible", (param: boolean) => {
  //       this.FooterVisible = param
  //     });
  //  // Offline event
  //  this.events.subscribe('network:offline', () => {
  //   this.toastCtrl.create({
  //     message:'No internet connection',
  //     duration:1000
  //   }).present();
  // });
  // // Online event
  // this.events.subscribe('network:online', () => {
  // });
  //       }
  // this.events.subscribe('updatecart', (updatecart: boolean) => {
  //   if (updatecart)
  //     this.createCartTimer();
  //   else {
  //     AppState.Second = 0;
  //     AppState.CartCount = 0;
  //     this.emptyCart();
  //   }
  // });
  // }
  /**
   * Subscribe the app events
   */
  subscribeEvents() {
    console.log("appfdf",AppState.UserCred);

    this.events.subscribe("memberloggedin", async () => {
      this.ProfileName =
        AppState.UserCred["firstname"] + " " + AppState.UserCred["lastname"];
      this.ProfilePic =
        AppState.UserCred["avatar"] == null || AppState.UserCred["avatar"] == ""
          ? "assets/imgs/userred.png"
          : AppState.UserCred["avatar"];
      this.Company =
        AppState.UserCred["wemalife"] == "1"
          ? "WemaLife"
          : AppState.UserCred.profile[0]["companyname"];
      this.pages = [];
      if (!AppState.IsWemaLife) {
        if (AppState.IsMember && AppState.UserCred["usertypeid"] == "4") {

          console.log('in app component page 4');

          this.pages.push({
            title: "Market Place ",
            component: HomePage, 
            icon: "assets/icon/master_dashboard.png"
          });
          this.pages.push({
            title: "My Account ",
            component: "MemberAccountPage",
            icon: "assets/icon/switch_acc.png"
          });
          //if (AppState.UserCred.hasOwnProperty('frienduserid') && AppState.UserCred['frienduserid'] == '0' && AppState.UserCred['companies'].length > 1)
          //  this.pages.push({ title: 'Switch Company', component: CompanySelectionPage, icon: "assets/icon/switch_acc.png" });
          // this.pages.push({ title: 'Add Company', component: AddCompanyPage, icon: "assets/icon/master_company.png" });
          // this.pages.push({ title: 'Friends/Family', component: FriendsFamilyPage, icon: "assets/icon/master_friendsfamily.png" });
          this.pages.push({
            title: "My Profile",
            component: "ProfilePage",
            icon: "assets/icon/master_myprofile.png"
          });
          // this.pages.push({ title: 'Preferences', component: PreferencePage, icon: "assets/icon/master_preference.png" });
          // this.pages.push({ title: 'Subscriptions', component: SubscriptionPage, icon: "assets/icon/master_subscription.png" });
          // this.pages.push({ title: 'Reports', component: MemberReportPage, icon: "assets/icon/reportblue.png" });
          // this.pages.push({ title: 'Inbox', component: EmailPage, icon: "assets/icon/master_inbox.png" });
          // this.pages.push({ title: 'Visit History', component: MemberVisitHistoryPage, icon: "assets/icon/master_Latestvisits.png" });
          // this.pages.push({ title: 'Chat', component: ChatPage, icon: "assets/icon/chatgreen.png" });
          //this.pages.push({ title: 'Contact Us', component: ProfilePage, icon: "assets/icon/master_edit_address.png" });
          this.pages.push({
            title: "Logout",
            component: null,
            icon: "assets/icon/master_logout.png"
          });
        }
      } else {
        if (AppState.IsMember && AppState.UserCred["usertypeid"] == "4") {

          console.log('in app component page 4');

          this.pages.push({
            title: "Market Place ",
            component: HomePage,
            icon: "assets/icon/master_dashboard.png"
          });
          this.pages.push({
            title: "My Account",
            component: "MemberAccountPage",
            icon: "assets/icon/switch_acc.png"
          });
          //if (AppState.UserCred.hasOwnProperty('frienduserid') && AppState.UserCred['frienduserid'] == '0' && AppState.UserCred['companies'].length > 1)
          //  this.pages.push({ title: 'Switch Company', component: CompanySelectionPage, icon: "assets/icon/switch_acc.png" });
          // this.pages.push({ title: 'Add Company', component: AddCompanyPage, icon: "assets/icon/master_company.png" });
          // this.pages.push({ title: 'Friends/Family', component: FriendsFamilyPage, icon: "assets/icon/master_friendsfamily.png" });
          this.pages.push({
            title: "My Profile",
            component: "ProfilePage",
            icon: "assets/icon/master_myprofile.png"
          });
          // this.pages.push({ title: 'Preferences', component: PreferencePage, icon: "assets/icon/master_preference.png" });
          // this.pages.push({ title: 'Subscriptions', component: SubscriptionPage, icon: "assets/icon/master_subscription.png" });
          // this.pages.push({ title: 'Reports', component: MemberReportPage, icon: "assets/icon/reportblue.png" });
          // this.pages.push({ title: 'Inbox', component: EmailPage, icon: "assets/icon/master_inbox.png" });
          // this.pages.push({ title: 'Visit History', component: MemberVisitHistoryPage, icon: "assets/icon/master_Latestvisits.png" });
          // this.pages.push({ title: 'Chat', component: 'ChatPage', icon: "assets/icon/chatgreen.png" });
          this.pages.push({
            title: "Logout",
            component: null,
            icon: "assets/icon/master_logout.png"
          });
        }
      }
      /*if (AppState.IsMember && AppState.UserCred.usertypeid == '4') {
        if (AppState.UserCred.companies != null && AppState.UserCred.companies.length > 1 && AppState.UserCred.source.toLowerCase() == "wemaplus"){
          AppState.IsMultipleCompay=true;
          this.rootPage= CompanySelectionPage;
        }
        else
          this.rootPage = TabsPage;
      }
      else*/
      //console.log('in app component page 5')
      this.rootPage = HomePage;
     // this.nav.push(MemberAccountPage);
    });
    this.events.subscribe("providerloggedin", async () => {
      this.ProfileName =
        AppState.UserCred["firstname"] + " " + AppState.UserCred["lastname"];
      this.ProfilePic =
        AppState.UserCred["avatar"] == null || AppState.UserCred["avatar"] == ""
          ? "assets/imgs/userred.png"
          : AppState.UserCred["avatar"];
      this.Company = AppState.UserCred.profile[0]["companyname"];
      this.pages = [];
      if (!AppState.IsWemaLife) {
        if (!AppState.IsMember && AppState.UserCred["usertypeid"] == "3") {
          this.pages.push({
            title: "Provider  Dashboard",
            component: "ProviderDashboardPage",
            icon: "assets/icon/master_dashboard.png"
          });
          // if (AppState.UserCred['companies'].length > 1) {
          //   this.pages.push({ title: 'Switch Company', component: EmailPage, icon: "assets/icon/switch_acc.png" });
          // }
          //this.pages.push({ title: 'Add Company', component: AddCompanyPage, icon: "assets/icon/master_company.png" });
          this.pages.push({
            title: "My Profile",
            component: "ProfilePage",
            icon: "assets/icon/master_myprofile.png"
          });
          // this.pages.push({ title: 'Expenses', component: BillsPage, icon: "assets/icon/master_bills.png" });
          // this.pages.push({ title: 'Mileage', component: MileagePage, icon: "assets/icon/master_mileage.png" });
          // this.pages.push({ title: 'Visit History', component: MemberVisitHistoryPage, icon: "assets/icon/master_Latestvisits.png" });
          // this.pages.push({ title: 'Emergency Alarm', component: EmergencyAlarmPage, icon: "assets/icon/alarm.png" });
          // this.pages.push({ title: 'Bill Report', component: ProviderBillingPage, icon: "assets/icon/master_providerbillreport.png" });
          // this.pages.push({ title: 'Reports', component: ProviderReportPage, icon: "assets/icon/reportblue.png" });
          // this.pages.push({ title: 'Inbox', component: EmailPage, icon: "assets/icon/master_inbox.png" });
          // this.pages.push({ title: 'Chat', component: 'ChatPage', icon: "assets/icon/chatgreen.png" });
          //this.pages.push({ title: 'Contact Us', component: ProfilePage, icon: "assets/icon/master_edit_address.png" });
          this.pages.push({
            title: "Logout",
            component: null,
            icon: "assets/icon/master_logout.png"
          });
        }
      } else {
        if (!AppState.IsMember && AppState.UserCred["usertypeid"] == "3") {
          this.pages.push({
            title: "Provider  Dashboard",
            component: "ProviderDashboardPage",
            icon: "assets/icon/master_dashboard.png"
          });
          // if (AppState.UserCred['companies'].length > 1) {
          //   this.pages.push({ title: 'Switch Company', component: EmailPage, icon: "assets/icon/switch_acc.png" });
          // }
          // this.pages.push({ title: 'Add Company', component: AddCompanyPage, icon: "assets/icon/master_company.png" });
          this.pages.push({
            title: "My Profile",
            component: "ProfilePage",
            icon: "assets/icon/master_myprofile.png"
          });
          // this.pages.push({ title: 'Expenses', component: BillsPage, icon: "assets/icon/master_bills.png" });
          // this.pages.push({ title: 'Mileage', component: MileagePage, icon: "assets/icon/master_mileage.png" });
          // this.pages.push({ title: 'Visit History', component: MemberVisitHistoryPage, icon: "assets/icon/master_Latestvisits.png" });
          // this.pages.push({ title: 'Emergency Alarm', component: EmergencyAlarmPage, icon: "assets/icon/alarm.png" });
          // this.pages.push({ title: 'Bill Report', component: ProviderBillingPage, icon: "assets/icon/master_providerbillreport.png" });
          // this.pages.push({ title: 'Reports', component: ProviderReportPage, icon: "assets/icon/reportblue.png" });
          // this.pages.push({ title: 'Inbox', component: EmailPage, icon: "assets/icon/master_inbox.png" });
          // this.pages.push({ title: 'Chat', component: 'ChatPage', icon: "assets/icon/chatgreen.png" });
          this.pages.push({
            title: "Logout",
            component: null,
            icon: "assets/icon/master_logout.png"
          });
        }
      }
      /*if (!AppState.IsMember && AppState.UserCred.usertypeid == '3') {
        if (AppState.UserCred.companies != null && AppState.UserCred.companies.length > 1 && AppState.UserCred.source.toLowerCase() == "wemaplus"){
          AppState.IsMultipleCompay=true;
           this.rootPage= CompanySelectionPage;
        }
        else
          this.rootPage = TabsPage;
      }
      else*/
      this.rootPage = "ProviderDashboardPage";
     // this.rootPage = MemberAccountPage;
    });
    this.events.subscribe("updatecart", (updatecart: boolean) => {
      if (updatecart) this.createCartTimer();
      else {
        AppState.Second = 0;
        AppState.CartCount = 0;
        this.emptyCart();
      }
    });
    this.events.subscribe("updateuser", () => {
      this.ProfileName =
        AppState.UserCred["firstname"] + " " + AppState.UserCred["lastname"];
      this.ProfilePic =
        AppState.UserCred["avatar"] == null || AppState.UserCred["avatar"] == ""
          ? "assets/imgs/userred.png"
          : AppState.UserCred["avatar"];
    });
    // this.events.subscribe("setRoot", (page: any) => {
    //   console.log('events scuribe ')
    //   this.rootPage = page;
    // });
    // this.events.subscribe("footervisible", (param: boolean) => {
    //   this.FooterVisible = param
    // });
    // Offline event
    this.events.subscribe("network:offline", () => {
      this.toastCtrl
        .create({
          message: "No internet connection",
          duration: 1000
        })
        .present();
    });
    // Online event
    this.events.subscribe("network:online", () => {});
  }
  /**
   * Set local db of the app
   */
  setStorage() {
    this.storage.get("UserCred").then(data => {
      if (data != null) {
        var userCred = JSON.parse(data);
        AppState.UserCred = userCred;
        AppState.IsMember = userCred["usertype"] == "Member" ? true : false;
        AppState.IsWemaLife = userCred["wemalife"] == 1 ? true : false;
        let allWemalifeCompanies = userCred["companies"].filter(
          c => c.wemalife == 1 && c.companywemalife == 1
        );
        let allWemaLife =
          allWemalifeCompanies.length == userCred.companies.length;
        if (AppState.IsMember && allWemaLife) {
          AppState.CurrentCompany = userCred.companies["0"];
          AppState.UserCred["currentCompany"] = userCred.companies["0"];
          AppState.UserCred["currentCompanyId"] = "1";
          AppState.UserCred["source"] = "wemalife";
        } else if (
          AppState.IsMember &&
          userCred.companies.length == 1 &&
          AppState.IsWemaLife
        ) {
          var singleCompany = userCred.companies["0"];
          AppState.IsWemaLife =
            singleCompany.wemaplus == 1 && singleCompany.companywemalife == 1
              ? false
              : true;
          AppState.CurrentCompany = singleCompany;
          AppState.UserCred["currentCompany"] = singleCompany;
          AppState.UserCred["currentCompanyId"] = singleCompany.companyid;
        } else {
          var defaultCompany = userCred.companies["0"];
          AppState.CurrentCompany = defaultCompany;
          AppState.UserCred["currentCompany"] = defaultCompany;
          AppState.UserCred["currentCompanyId"] = defaultCompany.companyid;
        }
        var publishMsg = AppState.IsMember
          ? "memberloggedin"
          : "providerloggedin";
        this.events.publish(publishMsg);
        // if(AppState.IsMember==true)
        // {
        // this.rootPage = HomePage;
        // }
        // else if(AppState.IsMember==false)
        // {
        //   this.rootPage=ProviderDashboardPage;
        // }
      }
    });
  }
  /**
   * Create cart timer
   */
  createCartTimer() {
    if (AppState.CartCount == 1) AppState.Second = 600;
    if (AppState.CartCount > 1) {
      if (AppState.Second + 1200 < 1800) {
        AppState.Second += 1200; //Add 20 minutes
      }
    }
    AppState.CartTimer = "00:00";
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
   * Open a page on navigation menu item click
   * @param page
   */
  async openPage(page) {
    var loggedOut;
    if (page.title == "Logout") {
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
          this.storage.set("intro-done", true);
          this.toastCtrl
            .create({
              message: "Logged out successfully",
              duration: 1000
            })
            .present();
          // window.location.reload();
          this.rootPage = SelectionPage;
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
          this.storage.set("intro-done", true);
          this.toastCtrl
            .create({
              message: "Logged out successfully",
              duration: 1000
            })
            .present();
          // window.location.reload();
          this.rootPage = SelectionPage;
        }
      }
    } else if (page.title == "Switch Company") {
      AppState.MenuEnabled = true;
      AppState.IsDashboard = true;
      this.rootPage = page.component;
    } else if (page.title == "My Profile") {
      AppState.IsDashboard = false;
      this.rootPage = page.component;
    } else {
      AppState.IsDashboard = true;
      this.rootPage = page.component;
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
    }
    return false;
  }
  /**
   * Timer elapsed
   */
  timerElapsed() {
    var minutes = Math.floor(AppState.Second / 60);
    var seconds = AppState.Second % 60;
    var formattedMinute = minutes.toString();
    var formattedSecond = seconds.toString();
    if (formattedMinute.length == 1) formattedMinute = "0" + formattedMinute;
    if (formattedSecond.length == 1) formattedSecond = "0" + formattedSecond;
    AppState.CartTimer = formattedMinute + ":" + formattedSecond;
    if (minutes == 0 && seconds == 0) this.emptyCart();
  }
  /**
   * Empty cart
   */
  async emptyCart() {
    if (AppState.CartCount > 0) {
      try {
        var request = {
          UserId: AppState.UserCred.userid,
          UniqueId: AppState.UniqueId
        };
        if (!AppState.IsWemaLife)
          request["CompanyId"] = AppState.CurrentCompany.companyid;
        var result = await this.apiProvider
          .Post(AppConst.EMPTY_CART, request)
          .toPromise();
        if (request != null && result["status"]) {
          AppState.CartCount = 0;
          AppState.UniqueId = null;
          AppState.BookMore = false;
          return true;
        }
        return false;
      } catch (ex) {
      } finally {
      }
    }
    return true;
  }
}
