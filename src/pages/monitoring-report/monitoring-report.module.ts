import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonitoringReportPage } from './monitoring-report';

@NgModule({
  declarations: [
    MonitoringReportPage,
  ],
  imports: [
    IonicPageModule.forChild(MonitoringReportPage),
  ],
})
export class MonitoringReportPageModule {}
