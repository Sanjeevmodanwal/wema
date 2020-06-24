import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentReceiptPage } from './payment-receipt';

@NgModule({
  declarations: [
    PaymentReceiptPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentReceiptPage),
  ],
})
export class PaymentReceiptPageModule {}
