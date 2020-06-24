import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectDeliveryLocPage } from './select-delivery-loc';

@NgModule({
  declarations: [
    SelectDeliveryLocPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectDeliveryLocPage),
  ],
})
export class SelectDeliveryLocPageModule {}
