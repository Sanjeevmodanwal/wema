import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppState } from '../../AppStates';
import { Slides } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the SlidersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sliders',
  templateUrl: 'sliders.html',
})
export class SlidersPage {
  @ViewChild(Slides) slides: Slides;
  Country: any;
  currentIndex: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   // this.slideChanged() 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SlidersPage');
    console.log(AppState.Country)
    this.Country=AppState.Country
  // this.Country='india'
   
  }
  
  slide = [ 
    {
      title: "We have got you in  " ,
      description: "If you want to change your location, click the tab below.",
      image: "assets/imgs/wemalife-slider-img.png",
      button: "Change country?"
    },
    {
      title: "Never Miss Anything",
      description: "Turn on your push notification and we’ll let you know when yo have an appointment coming up",
      image: "assets/imgs/wemalife-slider-img2.png",
      button: "Allow push notifications",
    },
  ];

  slideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', this.currentIndex);
  }

  ionslide()
  {
this.navCtrl.push(HomePage)
  }
}
