import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordSuccessPage } from './password-success';

@NgModule({
  declarations: [
    PasswordSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordSuccessPage),
  ],
})
export class PasswordSuccessPageModule {}
