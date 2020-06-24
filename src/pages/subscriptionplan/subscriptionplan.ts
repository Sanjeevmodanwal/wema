import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { AppConst } from '../../AppConst';
import { ApiProvider } from '../../providers/api/api';
import { CarePlanFilterPopupPage } from '../care-plan-filter-popup/care-plan-filter-popup';
import { CarePlanBookingPage } from '../care-plan-booking/care-plan-booking';
import { AdhocCheckoutPage } from '../adhoc-checkout/adhoc-checkout';

/**
 * Generated class for the SubscriptionplanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscriptionplan',
  templateUrl: 'subscriptionplan.html',
})
export class SubscriptionplanPage {
  itemExpandHeight: number = 0;
  isEmpty: boolean = false;
  subscriptions= [];
  selectedSubscription: any;
 // company: Array<{id: any, companyname: any}>;
  company=[];
  selectedcompnay_id :any;
  limit: number = 100;
  truncating = true;
  public appState = AppState;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public apiProvider: ApiProvider, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionplanPage');
  }

   /**
   * Cart click handler
   */
  viewCart() {
    this.navCtrl.push('AdhocCheckoutPage');
}

ionViewDidEnter() {
    this.getSubscriptions();
}

async checkAndAdd(id,name) {
  var found = this.company.some(function (el) {
    return el.companyname === name;
  });
  if (!found) { this.company.push({ id: id, companyname: name }); }
}
/**
 * Get subscription
 */
async getSubscriptions() {
    let filters = [
        { fieldname: "companyid", fieldvalue: AppState.UserCred.currentCompanyId, operators: "Equal" },
        { fieldname: "memberid", fieldvalue: AppState.UserCred.userid, operators: "Equal" },
    ]
    var request = {
        filter: filters,
        filterproperty: { offset: 0, orderby: "expirydate", recordlimit: 0 },
        companyid: AppState.UserCred.currentCompanyId
    };
    let response = await this.apiProvider.Post(AppConst.GET_SUBSCRIPTIONS, request).toPromise();
    if (response != null && response.hasOwnProperty('records') && response['records'] != null && response['records'].length > 0) {
        this.subscriptions = response['records'];
        this.subscriptions.forEach(element => {
             element['companydescriptionwitouthtmlentities'] = element.companydescription.replace(/<\/?[^>]+>/gi, "").replace('&nbsp;', ' ').replace('&amp;#39;', "'").replace('&#39;', "'");
          });
        this.isEmpty = false;
        for(let i in this.subscriptions)
        {
          this.checkAndAdd(this.subscriptions[i].companyid,this.subscriptions[i].companyname);
        }
    }
    else
        this.isEmpty = true;
}

/**
 * Expand item of list
 * @param item 
 */
expandItem(item) {
    this.subscriptions.map((listItem) => {
        if (item == listItem) {
            listItem.expanded = !listItem.expanded;
        } else {
            listItem.expanded = false;
        }
    });
}

/**
 * Book subscription
 * @param item 
 */
book(subscription: any) {
    if (subscription != null) {
        this.selectedSubscription = subscription;
        var carePlanFilterPopUp = this.modalCtrl.create('CarePlanFilterPopupPage', subscription);
        carePlanFilterPopUp.onDidDismiss((data) => {
            if (data != null) {
                data['planId'] = subscription.planid;
                data['companyId'] = subscription.companyid;
                data['orderId'] = subscription.orderid;
                this.navCtrl.push('CarePlanBookingPage', data);
            }
        });
        carePlanFilterPopUp.present();
    }
}

/**
 * Cancel subscription
 */
async cancel(subscription: any) {
    var message = "Cancellation fee of" + subscription.currency + subscription.penaltyprice + "will be charged to your card. Are you sure you want to Proceed";
    if (subscription.status == "1" && subscription.cancelled) {
        if (subscription.minimumplanperiod == subscription.planperiod.split(' ')[0])
            alert("You have purchased minimum plan period and you can't able to cancel");
        else {
            this.alertCtrl.create({
                message: message,
                buttons: [
                    {
                        text: 'Yes',
                        handler: () => {
                            var request = {
                                orderid: subscription.orderid,
                                userid: AppState.UserCred.userid,
                                companyid: subscription.companyid
                            }

                            let response = this.apiProvider.Post(AppConst.CANCEL_SUBSCRIPTION, request).subscribe((response) => {
                                if (response != null && response['status']) {
                                    alert('Subscription  plan cancelled');
                                    this.getSubscriptions();
                                }
                            });
                        }
                    },
                    'No'
                ]
            }).present();
        }
    }
    else {
        var message = "Minimum plan period is" + subscription.minimumplanperiod + " " + subscription.planperiod.split(' ')[1] + ". You can not cancel this subscription during this period";
        this.alertCtrl.create({
            message: message,
            buttons: ['Ok']
        }).present();
    }
}

}
