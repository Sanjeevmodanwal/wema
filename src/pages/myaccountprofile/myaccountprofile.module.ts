import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyaccountprofilePage } from './myaccountprofile';

@NgModule({
  declarations: [
    MyaccountprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(MyaccountprofilePage),
  ],
})
export class MyaccountprofilePageModule {}
