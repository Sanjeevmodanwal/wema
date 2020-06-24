import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingVisitReportPage } from './pending-visit-report';

@NgModule({
  declarations: [
    PendingVisitReportPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingVisitReportPage),
  ],
})
export class PendingVisitReportPageModule {}
