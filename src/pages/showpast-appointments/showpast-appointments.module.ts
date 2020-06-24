import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowpastAppointmentsPage } from './showpast-appointments';

@NgModule({
  declarations: [
    ShowpastAppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowpastAppointmentsPage),
  ],
})
export class ShowpastAppointmentsPageModule {}
