import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouritePage } from './favourite';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    FavouritePage,
  
  ],
  imports: [
    IonicPageModule.forChild(FavouritePage),
    PipesModule
  ],
})
export class FavouritePageModule {}
