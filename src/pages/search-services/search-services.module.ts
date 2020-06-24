import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchServicesPage } from './search-services';

@NgModule({
  declarations: [
    SearchServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchServicesPage),
  ],
})
export class SearchServicesPageModule {}
