import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  Events
} from "ionic-angular";
import { filter } from "rxjs/operator/filter";
import { AppState } from "../../AppStates";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import { DatePipe } from "@angular/common";
import { AdhocPaymentReceiptPage } from "../adhoc-payment-receipt/adhoc-payment-receipt";
import { PaymentPage } from "../payment/payment";
/**
 * Generated class for the ComapanyPurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-adhoc-checkout",
  templateUrl: "adhoc-checkout.html"
})
export class AdhocCheckoutPage {
  items: any = [];
  formattedDate;
  Date: string;
  CurrentDate;
  //company: any;
  isEmpty: boolean = false;
  enablePayLater: boolean = true;
  cartItems: any;
  cartCount: number;
  displayTotalPrice: any;
  notAvailableProviders: any;
  totalPrice = 0.0;
  formattedDateObj;
  public appState = AppState;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private apiProvider: ApiProvider,
    private datePipe: DatePipe,
    private events: Events
  ) {
    //this.items = { "items": "neha" };
    //this.items = { "items": "neha" }
    this.CurrentDate = new Date();
    this.getFormattedDate();
    this.Date = new Date().toISOString();
    //this.company = navParams.data.company;
  }
  ionViewDidEnter() {
    this.getCartItems();
  }
  /**
   * Cart click handler
   */
  viewCart() {
    this.navCtrl.push("AdhocCheckoutPage");
  }
  getFormattedDate() {
    var dateObj = new Date();
    var year = dateObj.getFullYear().toString();
    var month = dateObj.getMonth().toString();
    var date = dateObj.getDate().toString();
    var monthArray = [
      "jan",
      "feb",
      "mar",
      "april",
      "may",
      "june",
      "july",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec"
    ];
    this.formattedDate = year + "-" + monthArray[month] + "-" + date;
    this.formattedDate = new Date(this.formattedDate);
  }
  /**
   * Delete cart item
   * @param item
   */
  async delete(item: any) {
    let alert = this.alertCtrl.create({
      title: "",
      message: "Do you want to remove",
      buttons: [
        {
          text: "No",
          role: "No",
          handler: () => {
            //console.log('No clicked');
          }
        },
        {
          text: "Yes",
          cssClass: "#08a79d",
          handler: () => {
            var request = {
              cartid: item.cartid
            };
            var result = this.apiProvider.Post(
              AppConst.REMOVE_CART_ITEM,
              request
            );
            result.subscribe(
              response => {
                if (response != null && response["status"]) {
                  AppState.CartCount = AppState.CartCount - 1;
                  if (AppState.CartCount == 0) {
                    AppState.UniqueId = null;
                    AppState.BookMore = false;
                    //StopCartTimer();
                  } else {
                    //MessagingCenter.Send<MessageEvent>(new MessageEvent(), "updatecart");
                  }
                  this.getCartItems();
                }
              },
              err => {}
            );
          }
        }
      ]
    });
    alert.present();
  }
  /**
   * Get cart details of the user
   */
  async getCartItems() {
    var cartrequest = {
      UserId: AppState.UserCred.userid,
      UniqueId: AppState.UniqueId
    };
    if (!AppState.IsWemaLife)
      cartrequest["CompanyId"] = AppState.CurrentCompany.companyid;
    var response = await this.apiProvider
      .Post(AppConst.GET_CART_DETAILS, cartrequest)
      .toPromise();
    if (response != null && response["cartCount"] == 0) {
      AppState.CartCount = 0;
      this.isEmpty = true;
      this.enablePayLater = false;
      return;
    }
    this.cartCount = response["cartCount"];
    this.cartItems = response["cart"];
    for (var key in this.cartItems) {
      this.totalPrice += parseFloat(this.cartItems[key].total);
      this.cartItems[key].notAvailable = false;
      if (this.notAvailableProviders != null) {
        //var exist = this.notAvailableProviders.find(a => a.Date.Date == cart['date'] && a.StartTime == new TimeSpan(cart.StartTime.Hours, cart.StartTime.Minutes, cart.StartTime.Seconds) && a.EndTime == new TimeSpan(cart.EndTime.Hours, cart.EndTime.Minutes, cart.EndTime.Seconds) && a.ProviderId == cart['providerid']);
        /*if (exist)
        {
            cart['notAvailable'] = true;
        }*/
      }
    }
    this.displayTotalPrice =
      this.cartItems["0"].currency + this.totalPrice.toString();
  }
  /**
   *
   */
  async proceedToPay(payment: any) {
    // console.log(AppState.PaymentGatewayId)
    var gateWayId = payment == "paylater" ? "2" : AppState.PaymentGatewayId;
    let requestCarts = [];
    this.cartItems.forEach(arg => {
      requestCarts.push({
        CompanyId: arg.companyid,
        Date: arg.date,
        StartTime: arg.starttime,
        EndTime: arg.endtime,
        MemberId: AppState.UserCred.userid,
        ProviderId: arg.providerid,
        ServiceId: arg.serviceid,
        ItemPrice: parseFloat(arg.itemprice),
        // Total: parseFloat(arg.itemprice) * parseFloat(arg.duration),
        Total: parseFloat(arg.itemprice),
        Duration: arg.duration
      });
    });
    //console.log(requestCarts);
    var adhocBookingRequest = {
      Carts: requestCarts,
      GatewayId: gateWayId,
      CreatedBy: AppState.UserCred.userid,
      SubTotal: this.totalPrice,
      Total: this.totalPrice,
      MemberId: AppState.UserCred.userid,
      Type: "1",
      CompanyId: AppState.IsWemaLife ? "1" : AppState.CurrentCompany.companyid
    };
    var response = await this.apiProvider
      .Post(AppConst.ADHOC_BOOKING, adhocBookingRequest)
      .toPromise();
    if (gateWayId == "2") {
      if (response != null && response["status"]) {
        //StopCartTimer();
        AppState.UniqueId = null;
        AppState.BookMore = false;
        AppState.CartCount = 0;
        this.navCtrl.push("AdhocPaymentReceiptPage", {
          paylater: true,
          orderid: response["orderid"],
          hasBackButton: false
        });
      } else if (
        response != null &&
        !response["status"] &&
        response["notavailable"] != null
      ) {
        this.notAvailableProviders = response["notavailable"];
        await this.getCartItems();
      }
    } else {
      if (
        response != null &&
        !response["status"] &&
        response["notavailable"] != null
      ) {
        this.notAvailableProviders = response["notavailable"];
        await this.getCartItems();
      } else if (
        response != null &&
        response["status"] &&
        response["payment"]
      ) {
        //StopCartTimer();
        AppState.UniqueId = null;
        AppState.BookMore = false;
        AppState.CartCount = 0;
        this.navCtrl.push("PaymentPage", {
          paylater: false,
          paymenturl: response["paymenturl"],
          carts: this.cartItems,
          orderid: response["orderid"],
          memberid: AppState.UserCred.userid,
          isadhoc: true
        });
      }
    }
  }
}
