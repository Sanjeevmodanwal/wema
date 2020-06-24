import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelRefundPopupPage } from './cancel-refund-popup';

@NgModule({
  declarations: [
    CancelRefundPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(CancelRefundPopupPage),
  ],
})
export class CancelRefundPopupPageModule {}
