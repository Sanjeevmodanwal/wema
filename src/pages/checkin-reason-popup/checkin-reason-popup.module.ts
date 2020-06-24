import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinReasonPopupPage } from './checkin-reason-popup';

@NgModule({
  declarations: [
    CheckinReasonPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinReasonPopupPage),
  ],
})
export class CheckinReasonPopupPageModule {}
