import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularityPopupPage } from './popularity-popup';

@NgModule({
  declarations: [
    PopularityPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularityPopupPage),
  ],
})
export class PopularityPopupPageModule {}
