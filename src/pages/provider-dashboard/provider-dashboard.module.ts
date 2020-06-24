import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderDashboardPage } from './provider-dashboard';

@NgModule({
  declarations: [
    ProviderDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderDashboardPage),
  ],
})
export class ProviderDashboardPageModule {}
