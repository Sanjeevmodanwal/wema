import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";
import { InAppBrowser } from "../../../node_modules/@ionic-native/in-app-browser";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Helper } from "../../helpers/helper";
import { SumUp, SumUpPayment, SumUpResponse, SumUpLoginStatus } from "@ionic-native/sum-up/ngx";
import { map } from 'rxjs/operators';
/**
 * Generated class for the SumupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-sumup",
  templateUrl: "sumup.html"
})
export class SumupPage {
  private access_token: string = "bdb42c49-ed7d-4e10-a79b-d24d38d3aab1";
  data: any;
  currency: any;
  response: any;  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public SumupApi: InAppBrowser, 
    public toastController: ToastController,
    public SumUp: SumUp,  
  ) {
    this.data = this.navParams.data;
    // this.currency = Helper.getCountryCurrencySymbol(this.data.memberdetails.country);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad SumupPage");
  }
  async SumupAuth() {
    // //https://api.sumup.com/v0.1/checkouts
    // let request = {
    //   checkout_reference: "string",
    //   amount: 0,
    //   currency: "EUR",
    //   pay_to_email: "user@example.com",
    //   pay_from_email: "user@example.com",
    //   description: "string",
    //   return_url: "http://example.com"
    // };
    // var httpHeaders = new HttpHeaders();
    // httpHeaders = httpHeaders.append("Accept", "application/json");
    // httpHeaders = httpHeaders.append("content-type", "multipart/form-data");
    // httpHeaders = httpHeaders.append("Source-Api", "wemalife");
    // // var response = await this.apiProvider.Post('https://api.sumup.com/v0.1/checkouts', request).toPromise();
    // // console.log('sumup response');
    // // console.log(response);
    // var response = this.http.post(
    //   "https://api.sumup.com/v0.1/checkouts",
    //   request,
    //   {
    //     headers: httpHeaders
    //   }
    // );
    // //loader.dismiss();
    // console.log("response: ");
    // console.log(JSON.stringify(response));
  }
  //   plugins.sumup.pay(
  //     function(res) {
  //       /*
  //       res : {
  //           code // result code from sumup, more info here : https://github.com/sumup/sumup-android-sdk#1-response-fields
  //           message // message from sumup
  //           txcode // transaction code from sumup
  //         }
  //       */
  //     },
  //     function(error) {
  //     }, '10', 'EUR' , 'raj.ammy99@gmail.com', '789634');
  // //  GET https://api.sumup.com/authorize?response_type=code&client_id=fOcmczrYtYMJ7Li5GjMLLcUeC9dN&redirect_uri=https://sample-app.example.com/callback&scope=payments%20user.app-settings%20transactions.history%20user.profile_readonly&state=2cFCsY36y95lFHk4
  //   var web=this.SumupApi.create('https://www.google.com/maps/search/?api=1&query='+this.latitude+','+this.longitude+' ');
  // }
  async testSumup() {
    console.log('inside testSumup()');
  }

  async paySumup() : Promise<void>{
    console.log('inside paySumup()');
    this.SumUp.pay(10.0, "EUR")
  .then((res: SumUpPayment) => console.log(res))
  .catch((error: SumUpPayment) => console.error(error));
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async login(){
    console.log('inside login()');
    let message = "Welcome to login function.";
    this.presentToast(message);
  }

  async auth(){
    console.log('inside auth()');
    let message = "Welcome to auth function.";
    this.presentToast(message);
    try{
      this.SumUp.auth(this.access_token)
      .then((res: SumUpResponse) => {
        this.response = res;
        console.log(res)
      })
      .catch((error: SumUpResponse) => console.error(error));
    }catch(e){
      console.log('try catch');
      console.log(e);
    }
  }

  async getSettings(){
    console.log('inside getSettings()');
    let message = "Welcome to getSettings function.";
    this.presentToast(message);
    try{
      this.SumUp.getSettings()
      .then((res: SumUpResponse) => {
        this.response = res;
        console.log(res)
      })
      .catch((error: SumUpResponse) => console.error(error));
    }catch(e){
      console.log('try catch');
      console.log(e);
    }
  }

  async isLoggedIn(){
    console.log('inside isLoggedIn()');
    let message = "Welcome to isLoggedIn function.";
    this.presentToast(message);

    try{
      this.SumUp.isLoggedIn().then((res: SumUpLoginStatus) => {
        this.response = res;
        console.log(res)
      }).catch((error: SumUpLoginStatus) => console.error(error));
    }catch(e){
      console.log('try catch');
      console.log(e);
    }
  }

  async prepare(){
    console.log('inside prepare()');
    let message = "Welcome to prepare function.";
    this.presentToast(message);
    
    try{
      this.SumUp.prepare()
      .then((res) => {        
        console.log(res)
      })
      .catch((error) => console.error(error));
    }catch(e){
      console.log('try catch');
      console.log(e);
    } 
  }

  async logout(){
    console.log('inside logout()');
    let message = "Welcome to logout function.";
    this.presentToast(message);

    try{
      this.SumUp.logout()
      .then((res: SumUpResponse) => {
        this.response = res;
        console.log(res)
      })
      .catch((error: SumUpResponse) => console.error(error));
    }catch(e){
      console.log('try catch');
      console.log(e);
    }
  }

  async closeConnection(){
    console.log('inside closeConnection()');
    let message = "Welcome to closeConnection function.";
    this.presentToast(message);

    try{
      this.SumUp.closeConnection()
      .then((res: SumUpResponse) => {
        this.response = res;
        console.log(res)
      })
      .catch((error: SumUpResponse) => console.error(error));
      }catch(e){
      console.log('try catch');
      console.log(e);
    }
  }

  async pay(){
    console.log('inside pay()');
    let message = "Welcome to pay function.";
    this.presentToast(message);

    try{
      this.SumUp.pay(10.0, "EUR")
      .then((res: SumUpPayment) => {
        // this.response = res;
        console.log(res)
      })
      .catch((error: SumUpPayment) => console.error(error));
    } catch(e){
      console.log('try catch');
      console.log(e);
    }
  }
}
