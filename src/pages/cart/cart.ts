import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { ApiProvider } from '../../providers/api/api';
import { AppConst } from '../../AppConst';
import { SelectDeliveryLocPage } from '../select-delivery-loc/select-delivery-loc';
import { HomePage } from '../home/home';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
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
  totalPrice = 0.00;
  formattedDateObj;
  //isEmpty: boolean = false;
  public appState = AppState;
  Total: any;
  Currency: any;
  startTime: any;
  endTime: any;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public apiProvider:ApiProvider,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');

   // this.getCartItems();

  }
  clicked(event) {
    event.target.classList.add('class3'); // To ADD
    event.target.classList.remove('class1'); // To Remove
    event.target.classList.contains('class2'); // To check
    event.target.classList.toggle('class4'); // To toggle
  }

  ionViewDidEnter() {
    this.getCartItems();
  }
  deleteitem(item)
  {
this.delete(item)
  }

   /**
   * Delete cart item
   * @param item 
   */
 
  async delete(item:any) {

    let alert = this.alertCtrl.create({
      title: '',
      message: 'Do you want to remove ?',
      buttons: [
        {
          text: 'No',
          role: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          cssClass: "#08a79d",
          handler: () => {
            var request =
            {
              cartid: item.cartid
            };
            var result = this.apiProvider.Post(AppConst.REMOVE_CART_ITEM, request);
            result.subscribe((response) => {
              if (response != null && response['status']) {
                AppState.CartCount = AppState.CartCount - 1;


                if (AppState.CartCount == 0) {
                  AppState.UniqueId = null;

                  AppState.BookMore = false;

                  //StopCartTimer();
                }
                else {
                  //MessagingCenter.Send<MessageEvent>(new MessageEvent(), "updatecart");
                }

                this.getCartItems();
              }
            },
              (err) => {

              });

          }
        }
      ]
    });

    alert.present();
  }
  viewCart()
{

  this.navCtrl.push('CartPage')
}
  /**
   * Get cart details of the user
   */
  async getCartItems() {
    var cartrequest =
    {
      UserId: AppState.UserCred.userid,
      UniqueId: AppState.UniqueId
    };
   // if (!AppState.IsWemaLife)
     //cartrequest['CompanyId'] = AppState.CurrentCompany.companyid;
    var response = await this.apiProvider.Post(AppConst.GET_CART_DETAILS, cartrequest).toPromise();
    
    if (response != null && response['cartCount'] == 0) {
      AppState.CartCount = 0
      this.isEmpty = true;
      this.enablePayLater = false;
      //this.navCtrl.push(HomePage )
      this.navCtrl.setRoot(HomePage)
      return;
    }
    this.cartCount = response['cartCount'];
    this.cartItems = response['cart'];
    this.Total=response['total']
    this.Currency=response['cart'][0].currency
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
    this.displayTotalPrice = this.cartItems['0'].currency + this.totalPrice.toString();
    this.startTime = new Date(this.cartItems['0'].date+' '+this.cartItems['0'].starttime);
    this.endTime = new Date(this.cartItems['0'].date+' '+this.cartItems['0'].endtime);

  }

  checkOut()
  {
    this.navCtrl.push('SelectDeliveryLocPage')
  }




}
