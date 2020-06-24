import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAccountAddReviewPage } from './my-account-add-review';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyAccountAddReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAccountAddReviewPage),
    Ionic2RatingModule
  ],
})
export class MyAccountAddReviewPageModule {}
