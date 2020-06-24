import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchpagePage } from './searchpage';

@NgModule({
  declarations: [
    SearchpagePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchpagePage),
  ],
})
export class SearchpagePageModule {}
