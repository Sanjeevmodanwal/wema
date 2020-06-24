import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderReportFilterPopupPage } from './provider-report-filter-popup';

@NgModule({
  declarations: [
    ProviderReportFilterPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderReportFilterPopupPage),
  ],
})
export class ProviderReportFilterPopupPageModule {}
