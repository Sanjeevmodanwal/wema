import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import { ServicesInfoPage } from "../services-info/services-info";
import { TabsPage } from "../tabs/tabs";
import { AppState } from "../../AppStates";
import { CartPage } from "../cart/cart";
import { SearchpagePage } from "../searchpage/searchpage";
import { Storage } from "@ionic/storage";
/**
 * Generated class for the HealthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-health",
  templateUrl: "health.html"
})
export class HealthPage {
  isServicesVisible = false;
  search: boolean = false;
  services: any;
  filteredServices: any;
  Data = [];
  Care = [];
  filterIndex = -1;
  sortIndex = -1;
  searchData: any;
  public appState = AppState;
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    private loadingController: LoadingController
  ) {}
  ionViewDidLoad() {
    // console.log("ionViewDidLoad Health");
    this.CareCompany();
    this.GetpoularServices();
  }
  async CareCompany() {
    var response = await this.apiProvider
      .Post(AppConst.GET_Random_Company)
      .toPromise();
    // console.log(response);
  }
  async GetpoularServices() {
    var response = await this.apiProvider
      .Post(AppConst.GET_PopulerServices)
      .toPromise();
    // console.log(response);
    this.Data.push(response);
    // console.log(this.Data);
    this.Care = this.Data[0].data;
    // console.log(this.Data[0].data);
  }
  viewCart() {
    this.navCtrl.push("CartPage");
  }
  page_info(item, i) {
    // console.log(item);
    // console.log(i);
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
  toggleSearch() {
    this.navCtrl.push("SearchpagePage");
  }
  /*
  @param keyword Search the service
   */
  searchService(keyword: any) {
    this.isServicesVisible = true;
    let val = keyword.target.value;
    if (val && val.trim() != "") {
      this.filteredServices = this.services.filter(x =>
        x.servicename.toLowerCase().startsWith(val.toLowerCase())
      );
    } else this.isServicesVisible = false;
  }
  onSelectedService(item: any) {
    this.isServicesVisible = false;
    // this.Care.=item;
    //  this.GetpoularServices();
    this.filterIndex = -1;
  }
}
