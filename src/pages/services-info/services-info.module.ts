import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicesInfoPage } from './services-info';

@NgModule({
  declarations: [
    ServicesInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicesInfoPage),
  ],
})
export class ServicesInfoPageModule {}
