import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AverageRatingPage } from './average-rating';

@NgModule({
  declarations: [
    AverageRatingPage,
  ],
  imports: [
    IonicPageModule.forChild(AverageRatingPage),
  ],
})
export class AverageRatingPageModule {}
