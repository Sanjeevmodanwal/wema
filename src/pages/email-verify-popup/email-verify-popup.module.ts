import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailVerifyPopupPage } from './email-verify-popup';

@NgModule({
  declarations: [
    EmailVerifyPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailVerifyPopupPage),
  ],
})
export class EmailVerifyPopupPageModule {}
