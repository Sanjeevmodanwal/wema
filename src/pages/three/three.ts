import { Component, ViewChild , OnInit, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



/**
 * Generated class for the ThreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-three',
  templateUrl: 'three.html',
})
export class ThreePage implements OnInit{

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ThreePage');
  }

  
  accordionExapanded = false;
  @ViewChild("cc") cc: any;
  @ViewChild("ccc") ccc: any;
  @ViewChild("cccc") cccc: any;


  

  ngOnInit(){
    //console.log(this.cc.nativeElement);
    this.renderer.setElementStyle(this.cc.nativeElement, "webkitTranstiion", "max-height 500ms, padding 500ms");
  }

  toggleAccordion(){
    if(this.accordionExapanded){
        this.renderer.setElementStyle(this.cc.nativeElement, "max-height", "0px");
        this.renderer.setElementStyle(this.cc.nativeElement, "padding", "0px 0px");
    } else{
        this.renderer.setElementStyle(this.cc.nativeElement, "max-height", "500px");
        this.renderer.setElementStyle(this.cc.nativeElement, "padding", "0px 0px 0px");
    }
    this.accordionExapanded = !this.accordionExapanded;
  }

  toggleAccordion1(){
    if(this.accordionExapanded){
        this.renderer.setElementStyle(this.ccc.nativeElement, "max-height", "0px");
        this.renderer.setElementStyle(this.ccc.nativeElement, "padding", "0px 0px");
    } else{
        this.renderer.setElementStyle(this.ccc.nativeElement, "max-height", "800px");
        this.renderer.setElementStyle(this.ccc.nativeElement, "padding", "0px 0px 0px");
    }
    this.accordionExapanded = !this.accordionExapanded;
  }
  toggleAccordion2(){  
    if(this.accordionExapanded){   
        this.renderer.setElementStyle(this.cccc.nativeElement, "max-height", "0px");
        this.renderer.setElementStyle(this.cccc.nativeElement, "padding", "0px 0px");
    } else{
        this.renderer.setElementStyle(this.cccc.nativeElement, "max-height", "800px");
        this.renderer.setElementStyle(this.cccc.nativeElement, "padding", "0px 0px 0px");
    }
    this.accordionExapanded = !this.accordionExapanded;
  }
    
}   
