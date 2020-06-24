import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarePlanBookingPage } from './care-plan-booking';

@NgModule({
  declarations: [
    CarePlanBookingPage,
  ],
  imports: [
    IonicPageModule.forChild(CarePlanBookingPage),
  ],
})
export class CarePlanBookingPageModule {}
