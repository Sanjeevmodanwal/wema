import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnytimePage } from './anytime';

@NgModule({
  declarations: [
    AnytimePage,
  ],
  imports: [
    IonicPageModule.forChild(AnytimePage),
  ],
})
export class AnytimePageModule {}
