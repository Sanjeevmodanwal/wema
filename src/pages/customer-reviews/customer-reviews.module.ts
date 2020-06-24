import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerReviewsPage } from './customer-reviews';

@NgModule({
  declarations: [
    CustomerReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerReviewsPage),
  ],
})
export class CustomerReviewsPageModule {}
