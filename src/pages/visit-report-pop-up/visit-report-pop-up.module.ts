import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitReportPopUpPage } from './visit-report-pop-up';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    VisitReportPopUpPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitReportPopUpPage),
    Ionic2RatingModule
  ],
})
export class VisitsReportPopUpPageModule {}
