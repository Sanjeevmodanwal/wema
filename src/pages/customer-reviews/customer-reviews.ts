import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { App } from 'ionic-angular';
import { AppConst } from '../../AppConst';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the CustomerReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-reviews',
  templateUrl: 'customer-reviews.html',
})
export class CustomerReviewsPage {
  data: any;
  click: boolean=false;
  companyname:any;
  loction:any;
  Company:any;
  ratings:any;
  ratingArray:any[] =[];
  totalreview:any;
  firstRatingCount = 0;
  secondRatingCount =0;
  thirdRatingCount =0;
  fourthRatingCount =0;
  fifthRatingCount =0;
  totalnumber =100;
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiProvider:ApiProvider) {
   this.data=navParams.data;
   this.companyname=navParams.data.companyname;
   this.loction=navParams.data.location;
   this.ratings=navParams.data.ratings;
   console.log("review =");
   console.log(this.data);
   
   this.totalreview = this.data.length;
   if(this.data!=null ){

      for(let key in this.data){
        if(this.data[key].appointmentid !='' ){
               
          if(this.data[key].rating == '1'){
              this.firstRatingCount  += 1;
          }
          if(this.data[key].rating == '2'){
            this.secondRatingCount  += 1;
          }
          if(this.data[key].rating == '3'){
            this.thirdRatingCount  += 1;
          }
          if(this.data[key].rating == '4'){
            this.fourthRatingCount  += 1;
          }
          if(this.data[key].rating == '5'){
              this.fifthRatingCount  += 1;
          }
        }
      }
     
      let average           = 100 / this.totalreview;
      let percentageOne     = this.firstRatingCount * average;
      let percentageTwo     = this.secondRatingCount * average;
      let percentageThree   = this.thirdRatingCount * average;
      let percentageFour    = this.fourthRatingCount * average;
      let percentageFive    = this.fifthRatingCount * average;

      this.ratingArray.push({'rating':5,'percentage':percentageFive.toFixed(2)+'%'});
      this.ratingArray.push({'rating':4,'percentage':percentageFour.toFixed(2)+'%'});
      this.ratingArray.push({'rating':3,'percentage':percentageThree.toFixed(2)+'%'});
      this.ratingArray.push({'rating':2,'percentage':percentageTwo.toFixed(2)+'%'});
      this.ratingArray.push({'rating':1,'percentage':percentageOne.toFixed(2)+'%'});

   }
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad CustomerReviewsPage');
  }

}
