import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecentlyVisitPage } from './recently-visit';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    RecentlyVisitPage,
  ],
  imports: [
    IonicPageModule.forChild(RecentlyVisitPage),
    PipesModule
  ],
})
export class RecentlyVisitPageModule {}
