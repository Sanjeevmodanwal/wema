import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AppState } from "../../AppStates";
import { ApiProvider } from "../../providers/api/api";
import { AppConst } from "../../AppConst";
import { AdhocPaymentReceiptPage } from "../adhoc-payment-receipt/adhoc-payment-receipt";
import { PaymentPage } from "../payment/payment";
/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-review",
  templateUrl: "review.html"
})
export class ReviewPage {
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
  Currency: any;
  Total: any;
  DelivaryAdd: any;
  startTime: any;
  endTime: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apiProvider: ApiProvider
  ) {
    console.log('ReviewPage constructor');
    console.log(navParams.data);
    this.DelivaryAdd = navParams.data;
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad ReviewPage");
    this.getCartItems();
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
    this.Total = response["total"];
    this.Currency = response["cart"][0].currency;
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
    this.startTime = new Date(
      this.cartItems["0"].date + " " + this.cartItems["0"].starttime
    );
    this.endTime = new Date(
      this.cartItems["0"].date + " " + this.cartItems["0"].endtime
    );
  }
  async proceedToPay(payment: any) {
    console.log(AppState.PaymentGatewayId);
    var gateWayId = payment == "paylater" ? "2" : AppState.PaymentGatewayId;
    console.log(gateWayId);
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
    console.log(requestCarts);
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
  clicked(event) {
    event.target.classList.add("class3"); // To ADD
    event.target.classList.remove("class1"); // To Remove
    event.target.classList.contains("class2"); // To check
    event.target.classList.toggle("class4"); // To toggle
  }
}
