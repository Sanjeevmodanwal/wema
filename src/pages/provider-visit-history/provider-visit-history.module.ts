import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderVisitHistoryPage } from './provider-visit-history';

@NgModule({
  declarations: [
    ProviderVisitHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderVisitHistoryPage),
  ],
})
export class ProviderVisitHistoryPageModule {}
