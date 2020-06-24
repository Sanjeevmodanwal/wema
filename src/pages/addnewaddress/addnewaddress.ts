import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ActionSheetController,
  ToastController
} from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";
import { AppState } from "../../AppStates";
import { AppConst } from "../../AppConst";
import {
  EmailValidator,
  Validators,
  AbstractControl,
  FormGroup,
  FormControlName,
  FormControl
} from "@angular/forms";
import { SelectDeliveryLocPage } from "../select-delivery-loc/select-delivery-loc";
import {
  NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult,
  NativeGeocoderOptions
} from "@ionic-native/native-geocoder";
/**
 * Generated class for the AddnewaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-addnewaddress",
  templateUrl: "addnewaddress.html"
})
export class AddnewaddressPage {
  isSubmitted: boolean;
  myForm: FormGroup;
  name: FormControl;
  Address1: FormControl;
  Address2: FormControl;
  City: FormControl;
  contact1: FormControl;
  contact: FormControl;
  postcode: FormControl;
  secondaryMobNo: any;
  data: {
    name: string;
    Address1: string;
    Address2: string;
    contact: string;
    postcode: string;
    City: string;
    contact1: string;
  } = {
    name: null,
    Address1: null,
    Address2: null,
    contact: null,
    postcode: null,
    City: null,
    contact1: null
  };
  appState = AppState;
  recientlyviewd: any;
  loading: any;
  addressid: any;
  locality: string;
  subLocality: string;
  subLocality1: string;
  postcode1: string;
  Name: any;
  Contact: any;
  Contact1: any;
  updateaddress: any;
  Action: string;
  constructor(
    private nativeGeocoder: NativeGeocoder,
    public loadingCtrl: LoadingController,
    private loadingController: LoadingController,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private apiProvider: ApiProvider
  ) {
    //console.log("editabledata",navParams.data)
    //console.log("editabledata length",navParams.data.length);
    //if(navParams.data!=null)
    if (navParams.data.hasOwnProperty("postcode")) {
      this.subLocality = navParams.data.address;
      this.subLocality1 = navParams.data.address1;
      this.locality = navParams.data.city;
      this.postcode1 = navParams.data.postcode;
      this.Contact = navParams.data.mobile;
      this.Contact1 = navParams.data.secondary_mobile;
      this.Name = navParams.data.name;
      this.Action = "updateaddress";
      this.addressid = navParams.data.addressid;
      //console.log('in ifffff statments')
    } else {
      //console.log('in else statments')
      this.Action = "createaddress";
    }
    this.name = new FormControl("", Validators.required);
    this.Address1 = new FormControl("", Validators.required);
    // this.contact1=new FormControl();
    this.Address2 = new FormControl("", Validators.required);
    this.City = new FormControl("", Validators.required);
    this.contact = new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ]);
    this.contact1 = new FormControl("", [
      Validators.minLength(10),
      Validators.maxLength(10)
    ]);
    this.postcode = new FormControl("", [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6)
    ]);
    this.myForm = new FormGroup({
      name: this.name,
      Address1: this.Address1,
      Address2: this.Address2,
      City: this.City,
      contact: this.contact,
      postcode: this.postcode,
      contact1: this.contact1
    });
  }
  ionViewDidLoad() {
    //console.log('ionViewDidLoad AddnewaddressPage');
  }
  async submit() {
    this.isSubmitted = true;
    if (
      this.name.valid &&
      this.Address1.valid &&
      this.contact.valid &&
      this.postcode.valid &&
      this.Address2.valid &&
      this.City.valid
    ) {
      this.data.name = this.name.value;
      this.data.Address1 = this.Address1.value;
      this.data.contact = this.contact.value;
      this.data.postcode = this.postcode.value;
      this.data.Address2 = this.Address2.value;
      this.data.City = this.City.value;
      this.data.contact1 = this.contact1.value;
      //console.log(this.data);
      var request = {
        action: this.Action,
        address: this.subLocality,
        address1: this.subLocality1,
        addressid: this.addressid,
        mobile: this.data.contact,
        secondary_mobile: this.data.contact1,
        name: this.data.name,
        addressuserid: AppState.UserCred.userid,
        city: this.data.City,
        country: AppState.CountryCode,
        county: "",
        postcode: this.data.postcode
      };
      let Response = await this.apiProvider
        .post(AppConst.AddAddress, request)
        .toPromise();
      //console.log(Response)
      if ((Response["status"] = true)) {
        this.toastCtrl
          .create({
            message: "Address added successfully",
            duration: 2000
          })
          .present();
        // this.navCtrl.pop()
        // this.navCtrl.pop()
        this.navCtrl.push("SelectDeliveryLocPage");
      }
    }
  }
  getAddress() {
    this.loading = this.loadingCtrl.create({
      content: "Searching Location ..."
    });
    this.loading.present();
    this.loading.dismiss().then(() => {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder
        .reverseGeocode(
          AppState.Location.latitude,
          AppState.Location.longitude,
          options
        )
        .then((result: NativeGeocoderReverseResult[]) => {
          //console.log(result[0])
          //console.log(result[0].countryName)
          this.locality = result[0].locality;
          this.subLocality = result[0].subLocality;
          this.postcode1 = result[0].postalCode;
          // this.recientlyviewd = JSON.parse(result[0]);
          AppState.Country = result[0].countryName;
        })
        .catch((error: any) => console.log(error));
      this.nativeGeocoder
        .forwardGeocode("Berlin", options)
        .then((coordinates: NativeGeocoderForwardResult[]) =>
          console.log(
            "The coordinates are latitude=" +
              coordinates[0].latitude +
              " and longitude=" +
              coordinates[0].longitude
          )
        )
        .catch((error: any) => console.log(error));
    });
  }
}
