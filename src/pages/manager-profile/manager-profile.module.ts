import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManagerProfilePage } from './manager-profile';

@NgModule({
  declarations: [
    ManagerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ManagerProfilePage),
  ],
})
export class ManagerProfilePageModule {}
