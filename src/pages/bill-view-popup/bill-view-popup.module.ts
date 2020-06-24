import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillViewPopupPage } from './bill-view-popup';

@NgModule({
  declarations: [
    BillViewPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(BillViewPopupPage),
  ],
})
export class BillViewPopUpPageModule {}
