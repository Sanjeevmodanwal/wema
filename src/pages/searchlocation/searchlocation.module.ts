import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchlocationPage } from './searchlocation';

@NgModule({
  declarations: [
    SearchlocationPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchlocationPage),
  ],
})
export class SearchlocationPageModule {}
