import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberloginPage } from './memberlogin';
import { ModalPage } from '../modal/modal';

@NgModule({
  declarations: [
    MemberloginPage
  ],
  imports: [
    IonicPageModule.forChild(MemberloginPage),
  ],
})
export class MemberloginPageModule {}
