//import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';

//import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
//import { NavController } from 'ionic-angular';
/**
 * Generated class for the GetDirectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-get-direction',
  templateUrl: 'get-direction.html',
})
export class GetDirectionPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latitude: any;
  longitude: any;
  constructor(
    //private launchNavigator: LaunchNavigator ,
    public navCtrl: NavController, public navParams: NavParams) {
  console.log(navParams.data)
  this.latitude=navParams.data.lat
  this.longitude=navParams.data.long
  }

  ionViewDidLoad() {
    this.loadMap();
    this.addMarker();
  }

  loadMap(){
    let latLng = new google.maps.LatLng(this.latitude,this.longitude);
 
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
      position:new google.maps.LatLng(this.latitude,this.longitude)
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


 
 getdir()
 {
  /* let options: LaunchNavigatorOptions = {
    start: [this.latitude,this.longitude],
  app: this.launchNavigator.APP.GOOGLE_MAPS
  };
  
  this.launchNavigator.navigate('Toronto, ON', options)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );

    */
 } 
}
