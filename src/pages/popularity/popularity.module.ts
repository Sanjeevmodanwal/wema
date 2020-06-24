import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularityPage } from './popularity';

@NgModule({
  declarations: [
    PopularityPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularityPage),
  ],
})
export class PopularityPageModule {}
