import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalPage } from './modal';
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
  declarations: [
    ModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalPage),
    Ionic2RatingModule
  ],
})
export class ModalPageModule {}
