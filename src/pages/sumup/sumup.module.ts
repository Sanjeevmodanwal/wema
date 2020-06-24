import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SumupPage } from './sumup';

@NgModule({
  declarations: [
    SumupPage,
  ],
  imports: [
    IonicPageModule.forChild(SumupPage),
  ],
})
export class SumupPageModule {}
