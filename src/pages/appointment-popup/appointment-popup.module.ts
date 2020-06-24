import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentPopupPage } from './appointment-popup';

@NgModule({
  declarations: [
    AppointmentPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentPopupPage),
  ],
})
export class AppointmentPopupPageModule {}
