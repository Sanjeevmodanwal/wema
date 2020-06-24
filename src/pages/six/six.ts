import { Component, ViewChild , OnInit, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, CardContent } from 'ionic-angular';
import { AppConst } from '../../AppConst';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-six',
  templateUrl: 'six.html',
})
export class SixPage implements OnInit{
  Data: any;
  providerid: any;
  servicesid: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer ,private apiProvider:ApiProvider) {
   
    console.log(navParams.data)
    console.log(this.navParams.data.providerid)
    this.providerid=this.navParams.data.providerid
   // this.Data=navParams.data

   this.getProfile();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThreePage');
   
  }

  
  accordionExapanded = false;
  @ViewChild("cc") cc: any;
  @ViewChild("ccc") ccc: any;
  @ViewChild("cccc") cccc: any;


  

  ngOnInit(){
    console.log(this.cc.nativeElement);
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
    

  async getProfile()
{
  var request = {
    //companyid:this.companyid,
    providerid: this.providerid,
    serviceid: this.servicesid,
    filterproperty: {  dir: "DESC",  offset: 0,  orderby: "servicename",  recordlimit: 25 },
  };
  let response = await this.apiProvider.Post(AppConst.GET_PROVIDER_PROFILE_data,request).toPromise();
  console.log(response)
 this.Data=response
}   

}