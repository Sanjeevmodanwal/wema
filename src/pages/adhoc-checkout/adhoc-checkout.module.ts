import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdhocCheckoutPage } from './adhoc-checkout';

@NgModule({
  declarations: [
    AdhocCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(AdhocCheckoutPage),
  ],
})
export class AdhocCheckoutPageModule {}
