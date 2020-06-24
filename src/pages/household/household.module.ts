import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HouseholdPage } from './household';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    HouseholdPage,
  ],
  imports: [
    IonicPageModule.forChild(HouseholdPage),
    PipesModule
  ],
})
export class HouseholdPageModule {}
