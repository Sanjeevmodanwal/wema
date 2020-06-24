import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  NgZone, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { GetDirectionPage } from '../get-direction/get-direction';
declare var google: any;

/**
 * Generated class for the ProviderLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-provider-location',
  templateUrl: 'provider-location.html',
})
export class ProviderLocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  LocationInfo: any;
  lat:any;
  long:any;

  constructor( public geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.data)
 this.LocationInfo=navParams.data
 console.log(this.LocationInfo)
 this.lat=this.LocationInfo.latitude
 this.long=this.LocationInfo.longitude
 console.log(this.lat,this.long)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderLocationPage');
    this.loadMap();
    this.addMarker();
  }
  loadMap(){
    let latLng = new google.maps.LatLng(this.lat,this.long);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

  console.log(this.mapElement.nativeElement)
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  
    console.log(this.map)

  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position:new google.maps.LatLng(this.lat,this.long)
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
}
