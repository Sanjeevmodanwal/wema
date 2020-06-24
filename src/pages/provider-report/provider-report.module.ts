import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderReportPage } from './provider-report';

@NgModule({
  declarations: [
    ProviderReportPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderReportPage),
  ],
})
export class ProviderReportPageModule {}
