import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  ActionSheetController,
  Tabs
} from "ionic-angular";
import { SuperTabsModule, SuperTabsController } from "ionic2-super-tabs";
//import { SuperTabs } from 'ionic2-super-tabs';
import { AppState } from "../../AppStates";
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = "HouseholdPage";
  tab2Root = "MapPage";
  tab3Root = "PopularityPage";
  tab4Root = "FilterPage";
  Services: any;
  Tab1Data: any;
  public appState = AppState;
  recientlyviewd: any;
  constructor(
    public navCtrl: NavController,
    private superTabsCtrl: SuperTabsController,
    public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) {
    // console.log('TabsPage constructor');
    // console.log(navParams.data);
    this.Tab1Data = navParams.data;
    this.Services = navParams.data.servicename;
  }
  ionViewDidLoad() {
    // console.log("ionViewDidLoad TabsPage");
    // this.navCtrl.parent.select(1);
    //this.superTabsCtrl.setBadge('homeTab', 2);
  }
  viewCart() {
    this.navCtrl.push("CartPage");
  }
  seachbar() {
    this.navCtrl.push("SearchpagePage");
  }
  ClickOnpopup() {
    // console.log("in popup call");
    var bookServicePopup1 = this.modalCtrl.create(
      "PopularityPopupPage",
      { data: "" },
      { enableBackdropDismiss: true }
    );
    bookServicePopup1.onDidDismiss(data => {});
    bookServicePopup1.present();
  }
  onTabSelect(event) {
    // console.log(event);
    // console.log(event.index);
    if (event.index == 2) {
      this.Filters();
    }
  }
  Filters() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "SORT BY: ",
      buttons: [
        // {
        //   text: 'Popularity',
        //   handler: () => {
        //     console.log('reload')
        //    this.Tab1Data['Sort']='popularity'
        //    this.navCtrl.pop()
        //    this.navCtrl.push(TabsPage,this.Tab1Data)
        //   }
        // },
        {
          text: "Name",
          handler: () => {
            // console.log("Name");
            this.Tab1Data["Sort"] = "companyname";
            this.navCtrl.pop();
            this.navCtrl.push("TabsPage", this.Tab1Data);
          }
        },
        // {
        //   text: 'Distance',
        //   handler: () => {
        //     console.log('Distance')
        //     this.Tab1Data['Sort']='distance'
        //     this.navCtrl.pop()
        //     this.navCtrl.push(TabsPage,this.Tab1Data)
        //   }
        // },
        {
          text: "Ratings",
          handler: () => {
            // console.log("Ratings");
            this.Tab1Data["Sort"] = "ratings";
            this.navCtrl.pop();
            this.navCtrl.push("TabsPage", this.Tab1Data);
          }
        }
      ]
    });
    actionSheet.present();
  }
  // ClickOnpopup()
}
