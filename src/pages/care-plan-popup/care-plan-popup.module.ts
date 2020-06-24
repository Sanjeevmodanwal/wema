import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarePlanPopupPage } from './care-plan-popup';

@NgModule({
  declarations: [
    CarePlanPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(CarePlanPopupPage),
  ],
})
export class CarePlanPopupPageModule {}
