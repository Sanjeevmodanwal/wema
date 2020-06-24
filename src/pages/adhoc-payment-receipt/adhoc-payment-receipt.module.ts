
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdhocPaymentReceiptPage } from './adhoc-payment-receipt';

@NgModule({
  declarations: [
    AdhocPaymentReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(AdhocPaymentReceiptPage),
  ],
})
export class AdhocPaymentReceiptPageModule {}
