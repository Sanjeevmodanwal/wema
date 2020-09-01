import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import { TabsPage } from "../tabs/tabs";
import { AppState } from "../../AppStates";
import { CartPage } from "../cart/cart";
import { SearchpagePage } from "../searchpage/searchpage";
import { Storage } from "@ionic/storage";
/**
 * Generated class for the CarePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-care",
  templateUrl: "care.html"
})
export class CarePage {
  Data = [];
  Care = [];
  search: boolean = false;
  public appState = AppState;
  ServicesLogo: any;
  lat: any;
  lng: any;
  availibility: any;
  days: any;
  Postcode: any;
  CompanyData: any;
  id: any;
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams,
    private apiProvider: ApiProvider
  ) {}
  ionViewDidLoad() {
    console.log("ionViewDidLoad CarePage");
    this.CareCompany();
    this.GetpoularServices();
    this.getServices();
  }
  async CareCompany() {
    var response = await this.apiProvider
      .Post(AppConst.GET_Random_Company)
      .toPromise();
    console.log(response);
  }
  viewCart() {
    this.navCtrl.push("CartPage");
  }
  page_info(item, i) {
    console.log(item);
    console.log(i);
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
    if (AppState.Location == undefined) {
      this.navCtrl.push("EnableLocationPage");
    } else {
      this.navCtrl.push("TabsPage", item);
    }
  }
  async GetpoularServices() {
    console.log('inside GetpoularServices');
    var response = await this.apiProvider
      .Post(AppConst.GET_PopulerServices)
      .toPromise();
    console.log(response);
    this.Data.push(response);
    console.log("data anshu ",this.Data);
    this.Care = this.Data[0].data;
  }
  // toggleSearch() {
  //   if (this.search) {
  //     this.search = false;
  //   } else {
  //     this.search = true;
  //   }
  // }
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
    console.log(response["records"]);
    this.ServicesLogo = response["records"];
  }
  toggleSearch() {
    this.navCtrl.push("SearchpagePage", this.ServicesLogo);
  }
}
