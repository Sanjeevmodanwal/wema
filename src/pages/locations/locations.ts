import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import {  NgZone, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

@IonicPage()
 
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})



export class LocationsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitude: any;
    longitude: any;
  pet: string = "kittens";
  isAndroid: boolean = false;
  LocationInfo: any;
  constructor(  public geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
   this.LocationInfo=navParams.data
  this.latitude=this.LocationInfo.latitude
  this.longitude=this.LocationInfo.longitude
   console.log(this.LocationInfo)
    this.isAndroid = platform.is('android');

  }



  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');
    this.loadMap();
    this.addMarker();
  } 
  

  onSegmentChange()
  {
    this.loadMap();
    this.addMarker();
  }
  // ionViewDidEnter()
  // {
  //   this.loadMap();
  //   this.addMarker();
  // }
  

  loadMap(){
    let latLng = new google.maps.LatLng( this.latitude, this.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    
  
    if(this.mapElement.nativeElement!=undefined)
    {
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      console.log(this.map)
    }
   
    else
    {
console.log('in undefined elements')

    }
  
   

  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position:new google.maps.LatLng( this.latitude,this.longitude)
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


  in_Map()
  {
    console.log('you are in map page ')
   
 // @ViewChild('map') mapElement: ElementRef;

 this.loadMap();
this.addMarker();
this.new_map();
  //this.navCtrl.push(GetDirectionPage)
  }
  new_map()
  {
    this.loadMap();
this.addMarker();
  }
  list_page()
  {
   // console.log('you are in liat page ')
  // this.loadMap();
   // this.addMarker();
   // this.in_Map()
  }



  getDir()
  {
    this.navCtrl.push('GetDirectionPage',{lat:this.latitude,long:this.longitude})
  }
}


