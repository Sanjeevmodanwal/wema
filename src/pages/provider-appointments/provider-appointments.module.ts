import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderAppointmentsPage } from './provider-appointments';

@NgModule({
  declarations: [
    ProviderAppointmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderAppointmentsPage),
  ],
})
export class ProviderAppointmentsPageModule {}
