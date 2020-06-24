import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendEnquiryPopupPage } from './send-enquiry-popup';

@NgModule({
  declarations: [
    SendEnquiryPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(SendEnquiryPopupPage),
  ],
})
export class SendEnquiryPopupPageModule {}
