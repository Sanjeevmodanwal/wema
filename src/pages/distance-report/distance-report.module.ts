import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DistanceReportPage } from './distance-report';

@NgModule({
  declarations: [
    DistanceReportPage,
  ],
  imports: [
    IonicPageModule.forChild(DistanceReportPage),
  ],
})
export class DistanceReportPageModule {}
