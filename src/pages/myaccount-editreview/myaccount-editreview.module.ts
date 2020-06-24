import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyaccountEditreviewPage } from './myaccount-editreview';
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
  declarations: [
    MyaccountEditreviewPage,
  ],
  imports: [
    Ionic2RatingModule,
    IonicPageModule.forChild(MyaccountEditreviewPage),
  ],
})
export class MyaccountEditreviewPageModule {}
