import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnableLocationPage } from './enable-location';

@NgModule({
  declarations: [
    EnableLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(EnableLocationPage),
  ],
})
export class EnableLocationPageModule {}
