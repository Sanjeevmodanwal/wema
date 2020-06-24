import { Component, ViewChild, OnInit, Renderer } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  CardContent,
  AlertController,
  ToastController,
  Platform,
  App,
  LoadingController,
  ActionSheetController,
  ViewController
} from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import {
  NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult,
  NativeGeocoderOptions
} from "@ionic-native/native-geocoder";
import { DatePicker } from "@ionic-native/date-picker";
import { NgZone, ElementRef } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Geolocation } from "@ionic-native/geolocation";
import { ApiProvider } from "../../providers/api/api";
import { Observable } from "rxjs/Observable";
import { AppConst } from "../../AppConst";
import { DatePipe } from "@angular/common";
import { Slides } from "ionic-angular";
import { BookAppointmentPage } from "../book-appointment/book-appointment";
import { AppState } from "../../AppStates";
import { CartPage } from "../cart/cart";
import { MemberloginPage } from "../memberlogin/memberlogin";
declare var google: any;
declare var MarkerClusterer: any;
@IonicPage()
@Component({
  selector: "page-seven",
  templateUrl: "seven.html"
})
export class SevenPage implements OnInit {
  @ViewChild(Slides) slides: Slides;
  @ViewChild("map") mapElement: ElementRef;
  @ViewChild("searchbar", { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;
  listSearch: string = "";
  times = [
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00"
  ];
  map: any;
  marker: any;
  loading: any;
  search: boolean = false;
  error: any;
  switch: string = "map";
  regionals: any = [];
  currentregional: any;
  date: string;
  lat: any;
  lng: any;
  ApponitmentInfo: any;
  Date: any;
  button: boolean = false;
  currentSelected: any;
  Time: any;
  newdate: string;
  searchData: any;
  provider: any;
  company: any;
  firstDay: any;
  secondDay: any;
  thirdDay: any;
  fourthDay: any;
  fifthDay: any;
  sixthDay: any;
  seventhDay: any;
  slotTimes1: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes2: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes3: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes4: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes5: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes6: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  slotTimes7: Array<{
    date: any;
    time: string;
    price: string;
    followup_rate: string;
  }>;
  latitude: any;
  longitude: any;
  clinic_name = "";
  // date: any;
  //Time: any;
  CompanyReview: Array<any> = new Array<any>();
  ClinicList: any;
  providerId: any;
  ServiceId: any;
  AllSlot: any;
  Selected_ClinicId: any;
  homeClinic: string;
  ClinicId: any;
  clinicListID = [];
  CompanyId: any;
  Time1: any;
  isChecked: boolean;
  checked: string;
  currentIndex: number;
  data1 = [];
  datapush = [];
  Postcode: any;
  home: { name: string };
  public appState = AppState;
  NextData: {
    date: any;
    ServicesLocation: any;
    PostCode: any;
    ServicesType: any;
    Totalprices: any;
  };
  ClinicAddress: any;
  newdate1: any;
  SetLocation: any;
  isMatched: boolean;
  duration: any = "60";
  company_inhome_session: any = "60";
  homeserviceavailable: boolean = true;
  clinicserviceavailable = "true";
  compnayInfo = [];
  loader: any;
  companylatitude: string;
  companylongitude: string;
  gotoNextPageStatus: boolean;
  requestData: {};
  responsedata: Object;
  postcode_required: boolean = false;
  session_duration: string;
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation,
    private loadingController: LoadingController,
    private nativeGeocoder: NativeGeocoder,
    private datePipe: DatePipe,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private apiProvider: ApiProvider,
    public renderer: Renderer,
    private datePicker: DatePicker,
    public http: HttpClient
  ) {
      console.log('SevenPage constructor');
      console.log(navParams.data);
      this.ApponitmentInfo = navParams.data;
      this.CompanyId = this.ApponitmentInfo.companyid;
      this.providerId = this.ApponitmentInfo.providerid;

      if (this.ApponitmentInfo.serviceid != null) {
        this.ServiceId = this.ApponitmentInfo.serviceid;
      } else {
        this.ServiceId = this.ApponitmentInfo.serviceid;
      }

      //Set global booking service id :
      if (this.ServiceId != undefined) {
        AppState.GlobalBookingServiceId = this.ServiceId;
      }
      if (
        this.ApponitmentInfo != undefined &&
        this.ApponitmentInfo.providerid != undefined
      ) {
        AppState.GlobalBookingProviderId = this.ApponitmentInfo.providerid;
      }
      if (this.CompanyId != undefined) {
        AppState.GlobalBookingCompanyId = this.CompanyId;
        //alert(AppState.GlobalBookingCompanyId);
      }
      console.log('this.ApponitmentInfo'+JSON.stringify(this.ApponitmentInfo));
      console.log('this.CompanyId: '+this.CompanyId);
      console.log('this.providerId: '+this.providerId);
      console.log('this.ServiceId: '+this.ServiceId);
      console.log('AppState.GlobalBookingServiceId: '+AppState.GlobalBookingServiceId);
      console.log('AppState.GlobalBookingProviderId: '+AppState.GlobalBookingProviderId);
      console.log('AppState.GlobalBookingCompanyId: '+AppState.GlobalBookingCompanyId);

      // console.log( this.ApponitmentInfo.companyid, this.ApponitmentInfo.serviceid );
      this.platform.ready().then(() => this.loadMaps());
      this.regionals = [
        {
          title: "Marker 1",
          latitude: 52.50094,
          longitude: 13.29922
        },
        {
          title: "Marker 3",
          latitude: 52.5001,
          longitude: 13.29922
        },
        {
          title: "Marker 2",
          latitude: 49.1028606,
          longitude: 9.8426116
        }
      ];
      this.date = new Date().toISOString();      
      if (this.ApponitmentInfo.inhome_session != null) {
        this.duration = this.ApponitmentInfo.inhome_session;
        this.company_inhome_session = this.ApponitmentInfo.inhome_session;
      }
      this.setProviderdetails(this.ApponitmentInfo);
    }

  async setProviderdetails(pagedata: any) {
    console.log('inside setProviderdetails');
    if (!pagedata.hasOwnProperty("providerdetails")) {
      if (this.ServiceId != "") {
        this.requestData = {
          companyid: this.CompanyId,
          providerid: this.providerId,
          serviceid: this.ServiceId,
          filterproperty: {
            dir: "DESC",
            offset: 0,
            orderby: "servicename",
            recordlimit: 25
          }
        };
      } else {
        this.requestData = {
          companyid: this.CompanyId,
          providerid: this.providerId,
          filterproperty: {
            dir: "DESC",
            offset: 0,
            orderby: "servicename",
            recordlimit: 25
          }
        };
      }
      let response = await this.apiProvider
        .Post(AppConst.GET_PROVIDER_PROFILE_data, this.requestData)
        .toPromise();
      if (response != "") {
        this.responsedata = response;
        //Set providerdetails values if not exist in this.ApponitmentInfo
        this.ApponitmentInfo.providerdetails = {
          addressline: this.responsedata["addressline"],
          addressline1: this.responsedata["addressline1"],
          city: this.responsedata["city"],
          country: this.responsedata["country"],
          county: this.responsedata["county"],
          eqdetails: this.responsedata["eqdetails"],
          firstname: this.responsedata["firstname"],
          homenumber: this.responsedata["homenumber"],
          lastname: this.responsedata["lastname"],
          phonenumber: this.responsedata["phonenumber"],
          postcode: this.responsedata["postcode"]
        };
      }
    }
  }
  viewPlace(id) {
    console.log('inside viewPlace');
    // console.log("Clicked Marker", id);
  }
  loadMaps() {
    console.log('inside loadMaps');
    if (!!google) {
      this.initializeMap();
      this.initAutocomplete();
    } else {
      this.errorAlert(
        "Error",
        "Something went wrong with the Internet Connection. Please check your Internet."
      );
    }
  }
  errorAlert(title, message) {
    console.log('inside errorAlert');
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: "OK",
          handler: data => {
            this.loadMaps();
          }
        }
      ]
    });
    alert.present();
  }
  mapsSearchBar(ev: any) {
    console.log('inside mapsSearchBar');
    // set input to the value of the searchbar
    //this.search = ev.target.value;
    // console.log(ev);
    const autocomplete = new google.maps.places.Autocomplete(ev);
    autocomplete.bindTo("bounds", this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, "place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: "Autocomplete returned place with no geometry"
          });
        } else {
          sub.next(place.geometry.location);
          sub.complete();
        }
      });
    });
  }
  initAutocomplete(): void {
    console.log('inside initAutocomplete');
    // reference : https://github.com/driftyco/ionic/issues/7223
    this.addressElement = this.searchbar.nativeElement.querySelector(
      ".searchbar-input"
    );
    this.createAutocomplete(this.addressElement).subscribe(location => {
      // console.log("Searchdata", location);
      let options = {
        center: location,
        zoom: 10
      };
      this.map.setOptions(options);
      this.addMarker(location, "Mein gesuchter Standort");
    });
  }
  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    console.log('inside createAutocomplete');
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo("bounds", this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, "place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: "Autocomplete returned place with no geometry"
          });
        } else {
          // console.log("Search Lat", place.geometry.location.lat());
          this.lat = place.geometry.location.lat();
          // console.log("Search Lng", place.geometry.location.lng());
          this.lng = place.geometry.location.lng();
          sub.next(place.geometry.location);
          //sub.complete();
        }
      });
    });
  }
  initializeMap() {
    console.log('inside initializeMap');
    this.zone.run(() => {
      var mapEle = this.mapElement.nativeElement;
      this.map = new google.maps.Map(mapEle, {
        zoom: 10,
        center: { lat: 51.165691, lng: 10.451526 },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#e9e9e9" }, { lightness: 17 }]
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 20 }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{ color: "#ffffff" }, { lightness: 17 }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }]
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }, { lightness: 18 }]
          },
          {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{ color: "#ffffff" }, { lightness: 16 }]
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }, { lightness: 21 }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#dedede" }, { lightness: 21 }]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              { visibility: "on" },
              { color: "#ffffff" },
              { lightness: 16 }
            ]
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              { saturation: 36 },
              { color: "#333333" },
              { lightness: 40 }
            ]
          },
          { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#f2f2f2" }, { lightness: 19 }]
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [{ color: "#fefefe" }, { lightness: 20 }]
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }]
          }
        ],
        disableDoubleClickZoom: false,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true
      });
      let markers = [];
      for (let regional of this.regionals) {
        regional.distance = 0;
        regional.visible = false;
        regional.current = false;
        let markerData = {
          position: {
            lat: regional.latitude,
            lng: regional.longitude
          },
          map: this.map,
          title: regional.title
        };
        regional.marker = new google.maps.Marker(markerData);
        markers.push(regional.marker);
        regional.marker.addListener("click", () => {
          for (let c of this.regionals) {
            c.current = false;
            //c.infoWindow.close();
          }
          this.currentregional = regional;
          regional.current = true;
          //regional.infoWindow.open(this.map, regional.marker);
          this.map.panTo(regional.marker.getPosition());
        });
      }
      new MarkerClusterer(this.map, markers, {
        styles: [
          {
            height: 53,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 53,
            textColor: "#fff"
          },
          {
            height: 56,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 56,
            textColor: "#fff"
          },
          {
            height: 66,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 66,
            textColor: "#fff"
          },
          {
            height: 78,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 78,
            textColor: "#fff"
          },
          {
            height: 90,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 90,
            textColor: "#fff"
          }
        ]
      });
      google.maps.event.addListenerOnce(this.map, "idle", () => {
        google.maps.event.trigger(this.map, "resize");
        mapEle.classList.add("show-map");
        this.bounceMap(markers);
        this.getCurrentPositionfromStorage(markers);
      });
      google.maps.event.addListener(this.map, "bounds_changed", () => {
        this.zone.run(() => {
          this.resizeMap();
        });
      });
    });
  }
  //Center zoom
  //http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
  bounceMap(markers) {
    console.log('inside bounceMap');
    let bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }
    this.map.fitBounds(bounds);
  }
  resizeMap() {
    console.log('inside resizeMap');
    setTimeout(() => {
      google.maps.event.trigger(this.map, "resize");
    }, 200);
  }
  getCurrentPositionfromStorage(markers) {
    console.log('inside getCurrentPositionfromStorage');
    this.storage.get("lastLocation").then(result => {
      if (result) {
        let myPos = new google.maps.LatLng(result.lat, result.long);
        this.map.setOptions({
          center: myPos,
          zoom: 14
        });
        let marker = this.addMarker(
          myPos,
          "My last saved Location: " + result.location
        );
        markers.push(marker);
        this.bounceMap(markers);
        this.resizeMap();
      }
    });
  }
  showToast(message) {
    console.log('inside showToast');
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  choosePosition() {
    console.log('inside choosePosition');
    // console.log('inside choosePosition');
    this.storage.get("lastLocation").then(result => {
      // console.log(JSON.stringify(result));
      if (result) {
        let location = '';
        if (result.location != undefined){
          location = result.location;
        } else {
          location = this.Postcode;
        }
        let actionSheet = this.actionSheetCtrl.create({
          title: "Last Location: " + location,
          buttons: [
            {
              text: "Reload",
              handler: () => {
                this.getCurrentPosition();
              }
            },
            {
              text: "Delete",
              handler: () => {
                this.storage.set("lastLocation", null);
                this.Postcode = null;
                this.showToast("Location deleted!");
                this.initializeMap();
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
      } else {
        this.getCurrentPosition();
      }
    });
  }
  // go show currrent location
  getCurrentPosition() {
    console.log('inside getCurrentPosition');
    // console.log('inside getCurrentPosition');
    this.loading = this.loadingCtrl.create({
      content: "Searching Location ..."
    });
    this.loading.present();
    let locationOptions = { timeout: 10000, enableHighAccuracy: true };
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geolocation.getCurrentPosition(locationOptions).then(
      position => {
        this.loading.dismiss().then(() => {
          this.showToast("Location found!");
          // console.log(position.coords.latitude, position.coords.longitude);
          let options1: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
          };
          this.nativeGeocoder
            .reverseGeocode(
              position.coords.latitude,
              position.coords.longitude,
              options1
            )
            .then((result: NativeGeocoderReverseResult[]) => {
              // console.log('inside getCurrentPosition then...');
              // console.log(result[0].countryName);
              // console.log(result[0]);
              // AppState.Country=result[0].countryName
              this.Postcode = result[0].postalCode;
            })
            .catch((error: any) => console.log(error));
          let myPos = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          let options = {
            center: myPos,
            zoom: 14
          };
          this.map.setOptions(options);
          this.addMarker(myPos, "Mein Standort!");
          let alert = this.alertCtrl.create({
            title: "Location",
            message: "Do you want to save the Location?",
            buttons: [
              {
                text: "Cancel"
              },
              {
                text: "Save",
                handler: data => {
                  let lastLocation = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                  };
                  // console.log(lastLocation);
                  this.storage.set("lastLocation", this.Postcode).then(() => {
                    this.showToast("Location saved");
                  });
                }
              }
            ]
          });
          alert.present();
        });
      },
      error => {
        this.loading.dismiss().then(() => {
          this.showToast("Location not found. Please enable your GPS!");
          // console.log(error);
        });
      }
    );
  }
  toggleSearch() {
    console.log('inside toggleSearch');
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }
  addMarker(position, content) {
    console.log('inside addMarker');
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
    this.addInfoWindow(marker, content);
    return marker;
  }
  addInfoWindow(marker, content) {
    console.log('inside addInfoWindow');
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, "click", () => {
      infoWindow.open(this.map, marker);
    });
  }
  ionViewDidLoad() {    
    console.log('inside ionViewDidLoad');
    this.getAvailableSlots();
    // console.log(this.Time1);
    this.slideChanged();
    this.getClinicListpage();
    this.getCompnayInfo();
  }
  accordionExapanded = false;
  @ViewChild("cc") cc: any;
  @ViewChild("ccc") ccc: any;
  @ViewChild("cccc") cccc: any;
  ngOnInit() {
    console.log('inside ngOnInit');
    // console.log(this.cc.nativeElement);
    this.renderer.setElementStyle(
      this.cc.nativeElement,
      "webkitTranstiion",
      "max-height 500ms, padding 500ms"
    );
  }
  toggleAccordion2() {
    console.log('inside toggleAccordion2');
    if (this.accordionExapanded) {
      this.renderer.setElementStyle(this.cc.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(
        this.cc.nativeElement,
        "padding",
        "0px 0px"
      );
    } else {
      this.renderer.setElementStyle(
        this.cc.nativeElement,
        "max-height",
        "3600px"
      );
      this.renderer.setElementStyle(
        this.cc.nativeElement,
        "padding",
        "0px 0px 0px"
      );
    }
    this.accordionExapanded = !this.accordionExapanded;
  }
  toggleAccordion3() {
    console.log('inside toggleAccordion3');
    if (this.accordionExapanded) {
      this.renderer.setElementStyle(
        this.ccc.nativeElement,
        "max-height",
        "0px"
      );
      this.renderer.setElementStyle(
        this.ccc.nativeElement,
        "padding",
        "0px 0px"
      );
    } else {
      this.renderer.setElementStyle(
        this.ccc.nativeElement,
        "max-height",
        "3600px"
      );
      this.renderer.setElementStyle(
        this.ccc.nativeElement,
        "padding",
        "0px 0px 0px"
      );
    }
    this.accordionExapanded = !this.accordionExapanded;
  }
  toggleAccordion1() {
    console.log('inside toggleAccordion1');
    this.datePicker
      .show({
        date: new Date(),
        mode: "date",
        minDate: Date.now(),
        allowOldDates: false,
        allowFutureDates: true,
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
      })
      .then(
        date => {
          // console.log("Got date: ", date);
          this.Date = date;
          this.getAvailableSlots();
        },
        err => console.log("Error occurred while getting date: ", err)
      );
    // console.log(this.date);
  }
  clicked($event, i, item) {
    console.log('inside clicked');
    // console.log(i, item);
    this.Time1 = item;
    // console.log($event.srcElement.id);
    this.Time = $event.srcElement.id;
    // console.log(this.Time);
    var x = document.querySelectorAll(
      ".swiper-wrapper > .swiper-slide > .slide-zoom > button"
    );
    for (var j = 0; j < x.length; j++) {
      x[j].classList.remove("avtive");
    }
    $event.target.classList.add("avtive"); // To ADD
  }
  async getAvailableSlots() {
    console.log('inside getAvailableSlots');
    this.loader = this.loadingCtrl.create({
      content: "please wait.."
    });
    this.loader.present();
    // console.log(this.clinic_name);
    if (this.Selected_ClinicId != null) {
      this.homeClinic = "1";
    } else {
      this.homeClinic = "0";
    }
    if (this.clinic_name == "") {
      this.homeClinic = "0";
    }
    
    if(this.Date == null || this.Date == undefined || this.Date == ""){
      this.Date = new Date();
    }

    var request = {
      Allslot: this.checked,
      clinic_id: this.clinicListID.toString(),
      clinicserviceavailable: this.clinicserviceavailable,
      companyid: this.CompanyId,
      // date: this.datePipe.transform(this.Date, "dd-MMM-yy"),
      date: this.datePipe.transform(this.Date, "yyyy-MM-dd"),
      //date: '2019-02-10',
      duration: this.duration,
      home_clinic: this.homeClinic,
      homeserviceavailable: "true",
      providerid: this.providerId,
      select_clinic_id: this.clinic_name,
      serviceid: AppState.GlobalBookingServiceId,
      time: "06:00",
      type: "days",
      uniqueid: ""
    };

    // console.log('request data');
    // console.log(JSON.stringify(request));

    var response = await this.apiProvider
      .Post(AppConst.GET_ADHOC_PROVIDER_AVAILABILITY, request)
      .toPromise();

    // console.log('response');
    // console.log(JSON.stringify(response));
    if (
      response != null &&
      response.hasOwnProperty("records") &&
      response["records"].length > 0
    ) {
      this.SetLocation = response["records"]["0"].provider.details["postcode"];
      // this.firstDay = this.datePipe.transform(this.Date, "dd-MMM-yy");
      this.firstDay = this.datePipe.transform(this.Date, "yyyy-MM-dd");
      this.secondDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 24 * 60 * 60 * 1000,
        "yyyy-MM-dd"
      );
      this.thirdDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 48 * 60 * 60 * 1000,
        "yyyy-MM-dd"
      );
      this.fourthDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 72 * 60 * 60 * 1000,
        "yyyy-MM-dd"
      );
      this.fifthDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 96 * 60 * 60 * 1000,
        "yyyy-MM-dd"
      );
      this.sixthDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 120 * 60 * 60 * 1000,
        "yyyy-MM-dd"
      );
      this.seventhDay = this.datePipe.transform(
        new Date(this.firstDay).getTime() + 144 * 60 * 60 * 1000,
        "yyyy-MM-dd"
      );
      let available = response["records"]["0"]["available"];
      let i: number = 0;
      for (var key in available) {
        // console.log('key: '+key);
        if (i == 0 && available.hasOwnProperty(key) && available[key] != null) {
          // console.log(JSON.stringify(available[key]));
          var slots = (available[key].time) ? available[key].time : '' ;
          var rates = (available[key].rate) ? available[key].rate : '' ;
          var hourfollowrates = (available[key].followup_rate) ? available[key].followup_rate : '' ;
          this.slotTimes1 = [];
          let j: number = 0;
          if(slots != "" || slots != undefined || slots != null){
            for (let s in slots) {
              this.slotTimes1.push({
                date: key,
                time: slots[s],
                price: rates[slots[s]],
                followup_rate: hourfollowrates[slots[s]]
              });
              j++;
            }
          }
        } else if ( i == 1 && available.hasOwnProperty(key) && available[key] != null ) {
          var slots = (available[key].time) ? available[key].time : '' ;
          var rates = (available[key].rate) ? available[key].rate : '' ;
          var hourfollowrates = (available[key].followup_rate) ? available[key].followup_rate : '' ;
          this.slotTimes2 = [];
          let j: number = 0;
          if(slots != "" || slots != undefined || slots != null){
            for (let s in slots) {
              this.slotTimes2.push({
                date: key,
                time: slots[s],
                price: rates[slots[s]],
                followup_rate: hourfollowrates[slots[s]]
              });
              j++;
            }
          }
        } else if (
          i == 2 &&
          available.hasOwnProperty(key) &&
          available[key] != null
        ) {
          var slots = (available[key].time) ? available[key].time : '' ;
          var rates = (available[key].rate) ? available[key].rate : '' ;
          var hourfollowrates = (available[key].followup_rate) ? available[key].followup_rate : '' ;
          this.slotTimes3 = [];
          let j: number = 0;
          if(slots != "" || slots != undefined || slots != null){
            for (let s in slots) {
              this.slotTimes3.push({
                date: key,
                time: slots[s],
                price: rates[slots[s]],
                followup_rate: hourfollowrates[slots[s]]
              });
              j++;
            }
          }
        } else if (
          i == 3 &&
          available.hasOwnProperty(key) &&
          available[key] != null
        ) {
          var slots = (available[key].time) ? available[key].time : '' ;
          var rates = (available[key].rate) ? available[key].rate : '' ;
          var hourfollowrates = (available[key].followup_rate) ? available[key].followup_rate : '' ;
          this.slotTimes4 = [];
          let j: number = 0;
          if(slots != "" || slots != undefined || slots != null){
            for (let s in slots) {
              this.slotTimes4.push({
                date: key,
                time: slots[s],
                price: rates[slots[s]],
                followup_rate: hourfollowrates[slots[s]]
              });
              j++;
            }
          }
        } else if (
          i == 4 &&
          available.hasOwnProperty(key) &&
          available[key] != null
        ) {
          var slots = (available[key].time) ? available[key].time : '' ;
          var rates = (available[key].rate) ? available[key].rate : '' ;
          var hourfollowrates = (available[key].followup_rate) ? available[key].followup_rate : '' ;
          this.slotTimes5 = [];
          let j: number = 0;
          if(slots != "" || slots != undefined || slots != null){
            for (let s in slots) {
              this.slotTimes5.push({
                date: key,
                time: slots[s],
                price: rates[slots[s]],
                followup_rate: hourfollowrates[slots[s]]
              });
              j++;
            }
          }
        } else if (
          i == 5 &&
          available.hasOwnProperty(key) &&
          available[key] != null
        ) {
          var slots = (available[key].time) ? available[key].time : '' ;
          var rates = (available[key].rate) ? available[key].rate : '' ;
          var hourfollowrates = (available[key].followup_rate) ? available[key].followup_rate : '' ;
          this.slotTimes6 = [];
          let j: number = 0;
          if(slots != "" || slots != undefined || slots != null){
            for (let s in slots) {
              this.slotTimes6.push({
                date: key,
                time: slots[s],
                price: rates[slots[s]],
                followup_rate: hourfollowrates[slots[s]]
              });
              j++;
            }
          }
        } else if (
          i == 6 &&
          available.hasOwnProperty(key) &&
          available[key] != null
        ) {
          var slots = (available[key].time) ? available[key].time : '' ;
          var rates = (available[key].rate) ? available[key].rate : '' ;
          var hourfollowrates = (available[key].followup_rate) ? available[key].followup_rate : '' ;
          this.slotTimes7 = [];
          let j: number = 0;
          if(slots != "" || slots != undefined || slots != null){
            for (let s in slots) {
              this.slotTimes7.push({
                date: key,
                time: slots[s],
                price: rates[slots[s]],
                followup_rate: hourfollowrates[slots[s]]
              });
              j++;
            }
          }
        }
        i++;
      }
      console.log('firstDay: '+this.firstDay);
      console.log('secondDay: '+this.secondDay);
      console.log('thirdDay: '+this.thirdDay);
      console.log('fourthDay: '+this.fourthDay);
      console.log('fifthDay: '+this.fifthDay);
      console.log('sixthDay: '+this.sixthDay);
      console.log('seventhDay: '+this.seventhDay);
      console.log('slotTimes1');
      console.log(JSON.stringify(this.slotTimes1));
      console.log('slotTimes2');
      console.log(JSON.stringify(this.slotTimes2));
      console.log('slotTimes3');
      console.log(JSON.stringify(this.slotTimes3));
      console.log('slotTimes4');
      console.log(JSON.stringify(this.slotTimes4));
      console.log('slotTimes5');
      console.log(JSON.stringify(this.slotTimes5));
      console.log('slotTimes6');
      console.log(JSON.stringify(this.slotTimes6));
      console.log('slotTimes7');
      console.log(JSON.stringify(this.slotTimes7));
    }
    this.loader.dismiss();
    /* console.log('the response',response)
     this.Availability.push(response)
     console.log(this.Availability)*/
    /*
}
*/
  }
  getclinicSlot(selectedclinic: any) {    
    console.log('inside getclinicSlot');
    // console.log('inside getclinicSlot');
    // console.log("clinic id: "+this.clinic_name["id"]);    
    // console.log('selectedclinic: '+selectedclinic);
    this.Selected_ClinicId = selectedclinic;    
    this.ClinicAddress = this.clinic_name;
    if (selectedclinic == "") {
      this.homeClinic = "0";
    }
    this.Time1 = undefined;
    /*  if(this.Selected_ClinicId==null)
    {
    }*/
    this.getAvailableSlots();
  }
  async getCompnayInfo() {
    console.log('inside getCompnayInfo');
    // console.log('inside getCompnayInfo');
    if (this.CompanyId != "") {
      var request = {
        filterproperty: {
          offset: 0,
          recordlimit: 500,
          orderby: "servicename",
          dir: "DESC"
        },
        companyid: this.CompanyId
      };
      var response = await this.apiProvider
        .Post(AppConst.GET_COMPANYPROFILE, request)
        .toPromise();
      if (response != null && response != "") {
        for (let key in response) {
          this.compnayInfo = response[key]["compinfo"];
          this.companylatitude = this.compnayInfo["latitude"];
          this.companylongitude = this.compnayInfo["longitude"];
          this.ApponitmentInfo['servicesoffered'] = this.compnayInfo['offeredservices'];
        }
        
      }
      // console.log("==============compnayInfo==============");
      // console.log(this.compnayInfo);
      // console.log("==============compnayInfo==============");
    }
  }
  async getClinicListpage(){
    console.log('inside getClinicListpage');
    // console.log('inside getClinicListpage');
    var filters = [
      {
        fieldname: "provider_id",
        fieldvalue: this.providerId,
        operators: "Equal"
      },
      {
        fieldname: "serviceid",
        fieldvalue: AppState.GlobalBookingServiceId,
        operators: "Equal"
      },
      { fieldname: "latitude", fieldvalue: this.latitude, operators: "Equal" },
      { fieldname: "longitude", fieldvalue: this.longitude, operators: "Equal" }
      // { fieldname: "duration", fieldvalue: this.searchData.duration.slice(' ')['0'], operators: "Equal" }
    ];
    var request = {
      app: true,
      auth: true,
      filter: filters,
      // date: "2018-11-22",
      date: this.datePipe.transform(this.Date, "yyyy-MM-dd"),
      filterproperty: {
        offset: 0,
        recordlimit: 500,
        orderby: "id",
        dir: "DESC"
      },
      CompanyId: this.CompanyId,
      //  MemberId: AppState.UserCred.userid,
      login_Userid: this.providerId,
      companyno: "",
      sourceapi: "wemalife"
    };
    var response = await this.apiProvider
      .Post(AppConst.GET_CLINIC_LIST, request)
      .toPromise();
    // console.log('response: '+JSON.stringify(response));
    /* if (response != null && response != '' && response['records'] != null && response['records']['0']['providers'] != null && response['records']['0']['providers'].length > 0) {
    this.adhocProviders = response['records']['0']['providers'];*/
    // console.log(response);
    if (response != null && response != "" && response["records"] != null) {
      this.clinicserviceavailable = "true";
      for (let key in response["records"]) {
      }
      this.home = { name: "In Home" };
      // console.log(response["records"]);
      //response['records']=this.hom
      // this.data1.push(response['records'])
      // this.data1[0].push({id:'',name:'In Home'})
      for (let i in response["records"]) {
        // console.log(response["records"][i].id);
        this.ClinicId = response["records"][i].id;
        if (response["records"][i].id != "") {
          var availabilitycheck = response["records"][i].chackavailable;
          if (availabilitycheck > 0) {
            this.datapush.push({
              id: response["records"][i].id,
              name: response["records"][i].name
            });
            this.clinicListID.push(response["records"][i].id);
          }
        }
      }
      // console.log(this.ClinicId)
      this.ClinicList = response["records"];
      //console.log(this.ClinicList)
      this.datapush.push({ id: "", name: "In Home" });
      this.data1[0] = this.datapush;
    } else {
      this.clinicserviceavailable = "false";
    }
  }
  myFunction($event) {
    console.log('inside myFunction');
    this.isChecked = !this.isChecked;
    // I am assuming you want to switch between checking and unchecking while clicking on radio.
    // console.log(this.isChecked);
    if (this.isChecked == true) {
      // console.log("you have selected the i home");
      this.checked = "1";
      // console.log(this.checked);
      this.getAvailableSlots();
    } else {
      this.checked = "0";
      // console.log(this.checked);
      this.getAvailableSlots();
    }
  }
  slideChanged() {
    console.log('inside slideChanged');
    this.currentIndex = this.slides.getActiveIndex();
    // console.log("Current index is", this.currentIndex);
    if (this.currentIndex == undefined) {
      this.newdate1 = this.firstDay;
    } else if (this.currentIndex == 1) {
      this.newdate1 = this.secondDay;
    } else if (this.currentIndex == 2) {
      this.newdate1 = this.thirdDay;
    } else if (this.currentIndex == 3) {
      this.newdate1 = this.fourthDay;
    } else if (this.currentIndex == 4) {
      this.newdate1 = this.fifthDay;
    } else if (this.currentIndex == 5) {
      this.newdate1 = this.sixthDay;
    } else if (this.currentIndex == 6) {
      this.newdate1 = this.seventhDay;
    }
    //alert(this.newdate1);
  }
  checkCode() {
    console.log('inside checkCode');
    if (this.Postcode != this.SetLocation) {
      // this.isMatched = false;
    } else {
      // this.isMatched = true;
    }
  }
  /**
   * Get CLINIC LIST
   */
  async getClinicListpageShow() {
    console.log('inside getClinicListpageShow');
    var filters = [
      {
        fieldname: "provider_id",
        fieldvalue: this.providerId,
        operators: "Equal"
      },
      {
        fieldname: "serviceid",
        fieldvalue: this.ServiceId,
        operators: "Equal"
      },
      { fieldname: "latitude", fieldvalue: this.lat, operators: "Equal" },
      { fieldname: "longitude", fieldvalue: this.lng, operators: "Equal" }
      // { fieldname: "duration", fieldvalue: this.searchData.duration.slice(' ')['0'], operators: "Equal" }
    ];
    var request = {
      app: true,
      auth: true,
      filter: filters,
      // date: "2018-10-30",
      date: this.Date,
      filterproperty: {
        offset: 0,
        recordlimit: 500,
        orderby: "id",
        dir: "DESC"
      },
      CompanyId: this.CompanyId,
      //  MemberId: AppState.UserCred.userid,
      companyno: ""
    };
    var response = await this.apiProvider
      .Post(AppConst.GET_CLINIC_LIST, request)
      .toPromise();
    /* if (response != null && response != '' && response['records'] != null && response['records']['0']['providers'] != null && response['records']['0']['providers'].length > 0) {
      this.adhocProviders = response['records']['0']['providers'];*/
    if (response["records"]["0"] == null) {
      // console.log("empty response");
      let alert = this.alertCtrl.create({
        title: "Wema Life",
        subTitle: "Sorry no provider available in  given location",
        buttons: ["OK"]
      });
      alert.present();
    } else {
      if (
        typeof this.Postcode == "undefined" ||
        this.Postcode == "" ||
        this.Postcode == "undefined" ||
        this.Postcode == undefined
      ) {
        this.Postcode = "";
      }
      if (
        typeof this.Time1 == "undefined" ||
        this.Time1 == "" ||
        this.Time1 == "undefined" ||
        this.Time1 == undefined
      ) {
        this.Time1 = "";
      }
      this.gotoNextPageStatus = true;
      // console.log(response);
      if (this.Time1 != null && this.Postcode != null) {
        var bookingfirstpagedata = {
          Allslot: this.checked,
          clinic_id: this.clinicListID.toString(),
          clinicserviceavailable: this.clinicserviceavailable,
          companyid: this.CompanyId,
          duration: this.duration,
          home_clinic: this.homeClinic,
          homeserviceavailable: "true",
          providerid: this.providerId,
          // select_clinic_id: this.clinic_name,
          select_clinic_id: this.Selected_ClinicId,
          serviceid: AppState.GlobalBookingServiceId
        };
        let nextData = {
          date: this.newdate1,
          ServicesLocation: this.ClinicAddress,
          PostCode: this.Postcode,
          ServicesType: this.ApponitmentInfo,
          SelectedSlot: this.Time1,
          bookingfirstpagedata: bookingfirstpagedata,
          session_duration: (this.compnayInfo['inhome_session'])!=null?this.compnayInfo['inhome_session']:this.ApponitmentInfo.inhome_session
        };
        // console.log('on click next button');
        // console.log(JSON.stringify(nextData));
        this.navCtrl.push("BookAppointmentPage", nextData);
      } else {
        this.alertCtrl
          .create({
            message: "Please select slot and enter postcode  to proceed ",
            buttons: ["Ok"]
          })
          .present();
      }
    }
  }
  nextButton() {
    console.log('inside nextButton');
    // console.log('on click next');
    //this.bookappointment();
    //return false;
    // if(AppState.UserCred!=undefined)
    // {
    if (this.Date != "") {
      this.getClinicListpageShow();
    } else {
      // console.log("date is null");
    }
  }
  viewCart() {
    console.log('inside viewCart');
    this.navCtrl.push("CartPage");
  }
  bookappointment() {
    console.log('inside bookappointment');
    // companyprofile
  }
}
