import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ActionSheetController
} from "ionic-angular";
import { getSymbolIterator } from "@angular/core/src/util";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import {} from "@angular/animations";
import { CompanyProfilePage } from "../company-profile/company-profile";
import { App } from "ionic-angular";
import { ProviderInfoPage } from "../provider-info/provider-info";
import { AppState } from "../../AppStates";
import { Storage } from "@ionic/storage";
import { DatePipe } from "@angular/common";
/**
 * Generated class for the HouseholdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-household",
  templateUrl: "household.html"
})
export class HouseholdPage {
  companies: any;
  filteredCompanies: any;
  ServicesId: any;
  lat: any;
  long: any;
  Mile = [];
  Latitude = [];
  Lat: any;
  Lng: any;
  Longitude = [];
  distance: any;
  DataArray = [];
  // date =this.datePipe.transform(new Date(), 'dd/MM/yy');
  Date: any;
  Time: any;
  Postcode: any;
  Sortedby: any;
  companypicture: string;
  loader: any;
  avaliability: any;
  selecteddate: any;
  todayDate: any;
  recientlyviewd: any;
  providertype: any;
  FromSearchpage: boolean;
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    private datePipe: DatePipe,
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    private loadingController: LoadingController,
    private app: App,
    private storage: Storage
  ) {
    console.log('HouseholdPage constructor');
    console.log(navParams.data);
    //  console.log(navPccarams.data.serviceid)    
    if (navParams.data.serviceid == undefined) {
      // console.log("in undifined")
      this.FromSearchpage = true;
      this.ServicesId = navParams.data["Services"].serviceid;
      //this.ServicesId='55'
      // console.log(this.ServicesId)
      this.Lat = navParams.data["location"].lat;
      this.Lng = navParams.data["location"].lng;
      if (navParams.data["Time"] != undefined) {
        // console.log('in Time')
        this.Date = navParams.data["Time"].Date;
        this.Time = navParams.data["Time"].Time;
      }
      this.Postcode = navParams.data["location"].postcode;
      // this.Sortedby=navParams.data.
    } else {
      // console.log('in else statement')
      this.FromSearchpage = false;
      this.Lat = navParams.data.lat;
      this.Lng = navParams.data.lng;
      this.avaliability = navParams.data.avaliability;
      this.providertype = navParams.data.providertype;
      if (this.avaliability == "All") {
        this.avaliability = "";
      } else if (this.avaliability == "In Home") {
        this.avaliability = "0";
      } else if (this.avaliability == "In Clinic") {
        this.avaliability = "1";
      } else {
        this.avaliability = "";
      }
      this.ServicesId = navParams.data.serviceid;
      this.selecteddate = navParams.data.days;
      this.Sortedby = navParams.data.Sort;
    }
  }
  ionViewDidLoad() {
    this.companypicture = AppConst.WEMA_DEV_ROOT + "images/company.jpg";
    this.loader = this.loadingController.create({
      content: "Please wait.."
    });
    this.loader.present();
    // console.log('house hold page ')
    this.getCompanies();
    // console.log('ionViewDidLoad Health');
    setTimeout(() => {
      this.loader.dismiss();
    }, 2000);
  }
  items = [{ name: "one", active: false }];
  toggleClass(item) {
    item.active = !item.active;
  }
  /**
   * Get wemalife companies
   */
  async getCompanies() {
    // this.todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let filters = [];
    filters.push({
      fieldname: "serviceid",
      fieldvalue: this.ServicesId,
      operators: "Equal"
    });
    filters.push({
      fieldname: "date",
      fieldvalue: this.Date,
      operators: "Equal"
    });
    filters.push({
      fieldname: "time",
      fieldvalue: this.Time,
      operators: "Equal"
    });
    filters.push({ fieldname: "duration", fieldvalue: "", operators: "Equal" });
    filters.push({
      fieldname: "postcode",
      fieldvalue: this.Postcode,
      operators: "Equal"
    });
    filters.push({
      fieldname: "country",
      fieldvalue: AppState.CountryCode,
      operators: "Equal"
    });
    filters.push({
      fieldname: "companytype",
      fieldvalue: this.providertype,
      operators: "Equal"
    });
    filters.push({
      fieldname: "companyid",
      fieldvalue: "",
      operators: "Equal"
    });
    filters.push({ fieldname: "idtype", fieldvalue: "", operators: "Equal" });
    filters.push({
      fieldname: "home_clinic",
      fieldvalue: this.avaliability,
      operators: "Equal"
    });
    filters.push({ fieldname: "ratings", fieldvalue: "", operators: "Equal" });
    filters.push({ fieldname: "city", fieldvalue: "", operators: "Equal" });
    filters.push({
      fieldname: "post_code",
      fieldvalue: "",
      operators: "Equal"
    });
    filters.push({
      fieldname: "latitude",
      fieldvalue: this.Lat,
      operators: "Equal"
    });
    filters.push({
      fieldname: "longitude",
      fieldvalue: this.Lng,
      operators: "Equal"
    });
    var request = {
      auth: false,
      filter: filters,
      filterproperty: {
        dir: "DESC",
        offset: 0,
        orderby: this.Sortedby,
        recordlimit: 0
      },
      //  MemberId: AppState.UserCred.userid
      selectdatebutton: this.selecteddate
    };
    //console.log(request);
    let response = await this.apiProvider
      .Post(AppConst.GET_WEMALIFE_COMPANIES, request)
      .toPromise();
    let newCompany = [];
    if (response != null) {
      // this.loader.dismiss();
      this.companies = response["records"];
      this.filteredCompanies = this.companies;
      //  console.log(this.companies)
      //  console.log(this.companies)
      for (let i in this.companies) {
        //  this.companies[i].push("distance:this.distance")
        //  console.log(this.companies)
        //  console.log(this.companies[i].latitude)
        //  console.log(this.companies[i].longitude)
        //  this.companies[i]['distance'] =this.distance
        //  console.log(this.companies)
        // console.log(this.companies[i])
        // console.log(this.calculateDistance( AppState.Location.latitude, this.companies[i].latitude,AppState.Location.longitude, this.companies[i].longitude))
        this.companies[i]["distance"] =
          this.calculateDistance(
            AppState.Location.latitude,
            this.companies[i].latitude,
            AppState.Location.longitude,
            this.companies[i].longitude
          ) * 0.621371;
        // console.log(this.companies)
        //  console.log(this.companies[i]['distance'])
        //this.Latitude.push(this.companies[i].latitude)
        //this.Longitude.push(this.companies[i].longitude)
      }
      //  console.log(this.Latitude,this.Longitude)
      //   this.lat=this.companies[0].latitude
      //this.long=this.companies[0].longitude
      //this.Distance();
    }
    //this.loader.dismiss();
  }
  Distance() {
    for (let i in this.Latitude) {
      // this.calculateDistance(this.lat)
      this.calculateDistance(
        AppState.Location.latitude,
        this.Latitude[i],
        AppState.Location.longitude,
        this.Longitude[i]
      );
    }
  }
  calculateDistance(lat1: number, lat2: number, long1: number, long2: number) {
    let p = 0.017453292519943295; // Math.PI / 180
    let c = Math.cos;
    let a =
      0.5 -
      c((lat1 - lat2) * p) / 2 +
      (c(lat2 * p) * c(lat1 * p) * (1 - c((long1 - long2) * p))) / 2;
    let dis = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    //  console.log('distance',dis)
    this.distance = dis * 0.621371;
    // console.log(this.distance)
    //this.Mile.push(dis*0.621371);
    //  console.log(this.Mile)
    return this.distance;
  }
  Filters() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Last Location: ",
      buttons: [
        {
          text: "Reload",
          handler: () => {
            // console.log('reload')
            // this.getCurrentPosition();
          }
        },
        {
          text: "Delete",
          handler: () => {
            // console.log('delete')
            //  this.storage.set('lastLocation', null);
            //  this.showToast('Location deleted!');
            //  this.initializeMap();
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {}
        }
      ]
    });
    actionSheet.present();
  }
  itemTapped(item) {
    // console.log($event)
    if (item.listingtype == "company") {
      this.storage.get("viewedList").then(data => {
        if (data != null) {
          this.recientlyviewd = JSON.parse(data);
          // console.log("================recently view company  =====================");
          // console.log(this.recientlyviewd)
          // console.log("================recently view  of company =====================");
          for (let i in this.recientlyviewd) {
            this.DataArray.push(this.recientlyviewd[i]);
          }
        }
        //  console.log('in data array ',this.DataArray)
        this.storage.set("viewedList", JSON.stringify(this.DataArray));
        item["serviceid"] = this.ServicesId;
        item['listingtype'] = 'company';
        this.DataArray.push(item);
        this.app.getRootNav().push("CompanyProfilePage", item);
      });
      // this.navCtrl.push(CompanyProfilePage)
      // console.log(item)
    } else {
      this.storage.get("viewedList").then(data => {
        if (data != null) {
          this.recientlyviewd = JSON.parse(data);
          // console.log("================recently view company  =====================");
          // console.log(this.recientlyviewd)
          // console.log("================recently view  of company =====================");
          for (let i in this.recientlyviewd) {
            this.DataArray.push(this.recientlyviewd[i]);
          }
        }
        item["serviceid"] = this.ServicesId;
        this.DataArray.push(item);
        this.storage.set("viewedList", JSON.stringify(this.DataArray));
        //  console.log('',this.app.getRootNav())
        this.app.getRootNav().push("ProviderInfoPage", item);
        // this.navCtrl.push(CompanyProfilePage)
        // console.log(item)
      });
    }
  }
}
