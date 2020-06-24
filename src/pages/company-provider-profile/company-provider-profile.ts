import { Component, ViewChild } from '@angular/core';
import { CardContent , Platform, App, LoadingController, 
  ActionSheetController, ViewController, IonicPage,
   NavController, NavParams, ModalController,
    AlertController, ToastController, Events, Item } from 'ionic-angular';
import { IScrollTab, ScrollTabsComponent } from '../../../ionic2-scrolltabs/src/components/scrolltabs';
import { ApiProvider } from '../../providers/api/api';
import {  NgZone, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs/Observable';
//import { DatePipe } from '@angular/common';
import { AppConst } from '../../AppConst';
declare var google: any;


/**
 * Generated class for the CompanyProviderProfilePage page
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-provider-profile',
  templateUrl: 'company-provider-profile.html',
})
export class CompanyProviderProfilePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitude: any;
    longitude: any;

  tabs: IScrollTab[] = [
    {
      name: 'Map View',
    },
    {
      name: 'List View'
    },
  ];
 
  date: string;
  lat: any;
  lng: any;
  selectedTab: IScrollTab;
  searchData: any;
  provider: any;
  company: any;
  firstDay: any;
  secondDay: any;
  thirdDay: any;
 // slotTimes1: Array<{ date: any, time: string, price: string }>;
 // slotTimes2: Array<{ date: any, time: string, price: string }>;
  //slotTimes3: Array<{ date: any, time: string, price: string }>;
  @ViewChild('scrollTab') scrollTab: ScrollTabsComponent;
  //public appState = AppState;

 
  
  constructor( 
    public loadingCtrl: LoadingController,
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation,
     private loadingController: LoadingController,
      private viewCtrl: ViewController, 
         private alertCtrl: AlertController,public navCtrl: NavController,
          public navParams: NavParams, private apiProvider: ApiProvider,
           private modalCtrl: ModalController, private toastCtrl: ToastController,
           private events:Events) {

}


  ionViewDidLoad() {
    this.loadMap();
    this.addMarker();
    console.log(this.mapElement.nativeElement)
    this.scrollTab.go2Tab(0);
  }
  loadMap(){
    let latLng = new google.maps.LatLng(26.2748475,78.0880129);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position:new google.maps.LatLng(26.2748475,78.0880129)
    });
    let content = "<h4>Information!</h4>";         
   
    this.addInfoWindow(marker, content);
   
  }

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }

  /**
   * Call on page enter
   */
  ionViewDidEnter() {
 
  }

/**
   * Cart click handler
   */
  

  /**
   * Handler for tab changes
   */
  tabChange(data: any) {
    this.selectedTab = data.selectedTab;
    if(this.selectedTab.name=="AVAILABILITY")
    {
     // this.showBookServicePopup();
    }
    else
    {
      console.log("dataa")
    }
  }
    

}