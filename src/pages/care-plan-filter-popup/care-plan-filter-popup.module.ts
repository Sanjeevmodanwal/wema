import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarePlanFilterPopupPage } from './care-plan-filter-popup';

@NgModule({
  declarations: [
    CarePlanFilterPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(CarePlanFilterPopupPage),
  ],
})
export class CarePlanFilterPopUpPageModule {}
