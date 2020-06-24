import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupSuccessPage } from './signup-success';

@NgModule({
  declarations: [
    SignupSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupSuccessPage),
  ],
})
export class SignupSuccessPageModule {}
