import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpensesReportPage } from './expenses-report';

@NgModule({
  declarations: [
    ExpensesReportPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpensesReportPage),
  ],
})
export class ExpensesReportPageModule {}
