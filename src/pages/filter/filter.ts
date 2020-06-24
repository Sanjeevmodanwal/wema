import { Component, ViewChild , OnInit, Renderer  } from '@angular/core';

import { IonicPage, NavController, NavParams, CardContent , AlertController,
  ToastController, Platform, App,
   LoadingController,
    ActionSheetController, 
   ViewController} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import {  NgZone, ElementRef } from '@angular/core';
import { TabsPage } from '../tabs/tabs';
import { ThrowStmt } from '../../../node_modules/@angular/compiler';
declare var google: any;
declare var MarkerClusterer: any;
/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;
  regionals: any = [];
  currentregional: any;
  date: string;
  lat: any;
  data:any
  lng: any;
  map: any;
  marker: any;
  loading: any;
  search: boolean = false;
  location= [];
  tab3data: any;
  availibility: any;
  days: any;
  providertype: any;
  ServicesId: any;
  Lat: any;
  Servicesname: any;
  Date: any;
  Lng: any;
  Time: any;
  Postcode: any;
  Sortedby: any;
  FilterData: any;
  Filters= [];
  Tomorrow: boolean;
  Company=false;
  Individual=false;
  Next: boolean;
  Today: boolean;
  selectedday='';
  DataArray= [];
  CompanyData: string;
  recientlyviewd: any;
  selectitem='';
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation,
     private loadingController: LoadingController , public navParams: NavParams, private viewCtrl: ViewController, private alertCtrl: AlertController, private toastCtrl: ToastController,  public renderer: Renderer) {
 console.log(navParams.data)

 this.storage.get('days').then((data) => {
console.log('in data of filter ',data)
   this.selectedday=data
   if(this.selectedday=='today')
   {
     console.log('in console data selectedday')
     this.selectedday='Today'
   }
   else if(this.selectedday=='tomorrow')
   {console.log('in console tomorrow')
     this.selectedday='Tomorrow'
   }
   else if(this.selectedday=='week')
   {
     console.log('in console week')
     this.selectedday='Next'
   }
   else
   {
     this.selectedday=''
   }
 });
 this.storage.get('lat').then((data) => {
  console.log('in data of filter ',data)
  this.lat=data
  
   });
   this.storage.get('lng').then((data) => {
    console.log('in data of filter ',data)
    this.lng=data
    
     });
     this.storage.get('avaliability').then((data) => {
      console.log('in data of filter ',data)
      this.availibility=data
      
       });
       this.storage.get('Postcode').then((data) => {
        console.log('in data of filter ',data)
        this.Postcode=data
        
         });
         this.storage.get('providertype').then((data) => {
          console.log('in data of filter ',data)
          this.providertype=data
          if (this.providertype=='0')
{
  this.Company=true
}
else if(this.providertype=='4')
{
  this.Individual=true
}
else if( this.providertype=='0,4')
{
  this.Company=true
  this.Individual=true
}
           });


      this.tab3data=navParams.data.rutValue
      console.log('in navparms of filter',navParams.data.rutValue)
//this.Postcode=navParams.data.rutValue.Postcode
//this.availibility=navParams.data.rutValue.avaliability
//this.selectedday=navParams.data.rutValue.days
//his.providertype=navParams.data.rutValue.providertype




      




    // if(navParams.data.rutValue.serviceid==undefined)
    // {
    //   console.log("in undifined")
    //   this.ServicesId=navParams.data.rutValue['Services'].serviceid
    //   this.Servicesname=navParams.data.rutValue['Services'].servicename
    //   this.Lat=navParams.data.rutValue['location'].lat
    //   this.Lng=navParams.data.rutValue['location'].lng
    //   this.Date=navParams.data.rutValue['Time'].Date
    //   this.Time=navParams.data.rutValue['Time'].Time
    //   this.Postcode=navParams.data.rutValue['location'].postcode
    //  // this.ServicesId=navParams.data['Services'].serviceid
    // //  console.log(this.ServicesId)
    // }
    // else{
    //   this.Servicesname=navParams.data.rutValue.servicename
    //   this.ServicesId=navParams.data.rutValue.serviceid
    //   this.Sortedby=navParams.data.rutValue.Sort
    // }
      
 this.platform.ready().then(() => this.loadMaps());
      this.regionals = [{
        "title": "Marker 1",
        "latitude": 52.50094,
        "longitude": 13.29922,
      }, {
        "title": "Marker 3",
        "latitude": 52.50010,
        "longitude": 13.29922,
      }, {
        "title": "Marker 2",
        "latitude": 49.1028606,
        "longitude": 9.8426116
      }];
    this.date = new Date().toISOString();
    }
    viewPlace(id) {
      console.log('Clicked Marker', id);
    }
  
  
    loadMaps() {
      if (!!google) {
        this.initializeMap();
        this.initAutocomplete();
      } else {
        this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
      }
    }
  
    errorAlert(title, message) {
      let alert = this.alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.loadMaps();
            }
          }
        ]
      });
      alert.present();
    }
  
    mapsSearchBar(ev: any) {
      // set input to the value of the searchbar
      //this.search = ev.target.value;
      console.log(ev);
      const autocomplete = new google.maps.places.Autocomplete(ev);
      autocomplete.bindTo('bounds', this.map);
      return new Observable((sub: any) => {
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            sub.error({
              message: 'Autocomplete returned place with no geometry'
            });
          } else {
            sub.next(place.geometry.location);
            sub.complete();
          }
        });
      });
    }
  
    initAutocomplete(): void {
      // reference : https://github.com/driftyco/ionic/issues/7223
      this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
      this.createAutocomplete(this.addressElement).subscribe((location) => {
        console.log('Searchdata', location);
  
        let options = {
          center: location,
          zoom: 10
        };
        this.map.setOptions(options);
        this.addMarker(location, "Mein gesuchter Standort");
  
      });
    }
  
    createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
      this.location=[]
      const autocomplete = new google.maps.places.Autocomplete(addressEl);
      autocomplete.bindTo('bounds', this.map);
      return new Observable((sub: any) => {
        google.maps.event.addListener(autocomplete, 'place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            sub.error({
              message: 'Autocomplete returned place with no geometry'
            });
          } else {
            console.log('Search Lat', place.geometry.location.lat());
            this.lat=place.geometry.location.lat()
            console.log('Search Lng', place.geometry.location.lng());
            this.lng=place.geometry.location.lng()
            sub.next(place.geometry.location);
 this.location.push({lat:this.lat,lng:this.lng})

            //sub.complete();
          }
        });
      });
    }
  
    initializeMap() {
      this.zone.run(() => {
        var mapEle = this.mapElement.nativeElement;
        this.map = new google.maps.Map(mapEle, {
          zoom: 10,
          center: { lat: 51.165691, lng: 10.451526 },
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }],
          disableDoubleClickZoom: false,
          disableDefaultUI: true,
          zoomControl: true,
          scaleControl: true,
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
            title: regional.title,
          };
  
          regional.marker = new google.maps.Marker(markerData);
          markers.push(regional.marker);
  
          regional.marker.addListener('click', () => {
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
              textColor: '#fff'
            },
            {
              height: 56,
              url: "assets/img/cluster/MapMarkerJS.png",
              width: 56,
              textColor: '#fff'
            },
            {
              height: 66,
              url: "assets/img/cluster/MapMarkerJS.png",
              width: 66,
              textColor: '#fff'
            },
            {
              height: 78,
              url: "assets/img/cluster/MapMarkerJS.png",
              width: 78,
              textColor: '#fff'
            },
            {
              height: 90,
              url: "assets/img/cluster/MapMarkerJS.png",
              width: 90,
              textColor: '#fff'
            }
          ]
        });
  
  
  
  
        google.maps.event.addListenerOnce(this.map, 'idle', () => {
          google.maps.event.trigger(this.map, 'resize');
          mapEle.classList.add('show-map');
          this.bounceMap(markers);
          this.getCurrentPositionfromStorage(markers)
        });
  
        google.maps.event.addListener(this.map, 'bounds_changed', () => {
          this.zone.run(() => {
            this.resizeMap();
          });
        });
  
  
      });
    }
  
    //Center zoom
    //http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
    bounceMap(markers) {
      let bounds = new google.maps.LatLngBounds();
  
      for (var i = 0; i < markers.length; i++) {
        bounds.extend(markers[i].getPosition());
      }
  
      this.map.fitBounds(bounds);
    }
  
    resizeMap() {
      setTimeout(() => {
        google.maps.event.trigger(this.map, 'resize');
      }, 200);
    }
  
    getCurrentPositionfromStorage(markers) {
      this.storage.get('lastLocation').then((result) => {
        if (result) {
          let myPos = new google.maps.LatLng(result.lat, result.long);
          this.map.setOptions({
            center: myPos,
            zoom: 14
          });
          let marker = this.addMarker(myPos, "My last saved Location: " + result.location);
  
          markers.push(marker);
          this.bounceMap(markers);
  
          this.resizeMap();
        }
      });
    }
  
    showToast(message) {
      let toast = this.toastCtrl.create({
        message: message,
        duration: 3000
      });
      toast.present();
    }
  
    choosePosition() {
      this.storage.get('lastLocation').then((result) => {
        if (result) {
          let actionSheet = this.actionSheetCtrl.create({
            title: 'Last Location: ' + result.location,
            buttons: [
              {
                text: 'Reload',
                handler: () => {
                  this.getCurrentPosition();
                }
              },
              {
                text: 'Delete',
                handler: () => {
                  this.storage.set('lastLocation', null);
                  this.showToast('Location deleted!');
                  this.initializeMap();
                }
              },
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                }
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
      this.loading = this.loadingCtrl.create({
        content: 'Searching Location ...'
      });
      this.loading.present();
  
      let locationOptions = { timeout: 10000, enableHighAccuracy: true };
  

      this.geolocation.getCurrentPosition(locationOptions).then(
        (position) => {
          this.loading.dismiss().then(() => {
  
            this.showToast('Location found!');
  
            console.log(position.coords.latitude, position.coords.longitude);
            let myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let options = {
              center: myPos,
              zoom: 14
            };
            this.map.setOptions(options);
            this.addMarker(myPos, "Mein Standort!");
  
            let alert = this.alertCtrl.create({
              title: 'Location',
              message: 'Do you want to save the Location?',
              buttons: [
                {
                  text: 'Cancel'
                },
                {
                  text: 'Save',
                  handler: data => {
                    let lastLocation = { lat: position.coords.latitude, long: position.coords.longitude };
                    console.log(lastLocation);
                    this.storage.set('lastLocation',lastLocation).then(() => {
                      this.showToast('Location saved');
                    });
                  }
                }
              ]
            });
            alert.present();
  
          });
        },
        (error) => {
          this.loading.dismiss().then(() => {
            this.showToast('Location not found. Please enable your GPS!');
            console.log(error);
          });
        }
      )
    }
  
    toggleSearch() {
      if (this.search) {
        this.search = false;
      } else {
        this.search = true;
      }
    }
  
    addMarker(position, content) {
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: position
      });
  
      this.addInfoWindow(marker, content);
      return marker;
    }
  
    addInfoWindow(marker, content) {
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });
  
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
      
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');

  }



  Reset()
  {
    this.storage.remove('days')
    this.storage.remove('lat')
    this.storage.remove('lng')
    this.storage.remove('avaliability')
    this.storage.remove('Postcode')
    this.storage.remove('providertype')

  }
  submit(item:any)
  {

    this.selectedday = item;
    console.log(this.selectedday)
    if(item=='Today' || item=='today')
    { 
      //this.Today=true
      this.days='today'
      
    }
    else if(item=='Tomorrow' || item=='tomorrow' )
    {
      //this.Tomorrow=true
      this.days='tomorrow'
    }
    else if(item=='Next' || item=='week')
    {
      //this.Next=true
      this.days='week'
      console.log('in week',this.days)
    }
    else
    {
      this.days=''
    }
    

    if(this.Tomorrow==true)
    {
      this.Next=false
      this.Today=false
    }
   else if(this.Next==true)
    {
      this.Today=false
      this.Tomorrow=false
    }
    else if(this.Today==true)
    {
      this.Next==false
      this.Tomorrow=false
    }
  }

  submit1(item:any)
  {
this.selectitem=item

    //if(item=='Company' || this.CompanyData=='0' ) // added by amit
    if(item=='Company' )     // added by mag
    {
      if(this.Company==true)
      {
        this.Company=false
      }
      else if(this.Company==false)
      {
        //this.CompanyData='0'
        this.Company=true
      }

    }
   // else if(item=='Individual' || this.CompanyData=='4' ) // added by amit
    else if(item=='Individual' )  // added by mag
    {
      if(this.Individual==true)
      {
        this.Individual=false
      }
      else if(this.Individual==false)
      {
        //this.CompanyData='4'
        this.Individual=true
      }


    }


    //if( (this.Individual==true && this.Company==true ) ||  this.CompanyData=='0,4')
    if( this.Individual==true && this.Company==true )
    {
      console.log('in both filter')
      this.CompanyData='0,4'
    }else if(this.Individual==true && this.Company==false){
        this.CompanyData='4'
    }else if(this.Individual==false && this.Company==true){  
      this.CompanyData='0'   
    }else{
      this.CompanyData=''
    }

   //s alert(this.CompanyData);
  }

  submit2()
  {

  }
  Filter()
  {
console.log(this.location)
this.tab3data['lat']=this.lat
this.storage.set('lat', this.lat);
this.tab3data['lng']=this.lng
this.storage.set('lng', this.lng);
this.tab3data['avaliability']=this.availibility
this.storage.set('avaliability',this.availibility);
this.tab3data['days']=this.days
this.storage.set('days',this.days);
this.tab3data['Postcode']=this.Postcode
this.storage.set('Postcode',this.Postcode);
this.tab3data['providertype']= this.CompanyData
this.storage.set('providertype',this.CompanyData);
this.app.getRootNav().pop()
this.app.getRootNav().push(TabsPage,this.tab3data)
  }
}
