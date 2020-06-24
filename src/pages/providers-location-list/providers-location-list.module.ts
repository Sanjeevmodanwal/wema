import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProvidersLocationListPage } from './providers-location-list';
import { SuperTabsModule } from "ionic2-super-tabs";
@NgModule({
  declarations: [
    ProvidersLocationListPage,
  ],
  imports: [
    IonicPageModule.forChild(ProvidersLocationListPage),
    SuperTabsModule,
  ],
})
export class ProvidersLocationListPageModule {}
