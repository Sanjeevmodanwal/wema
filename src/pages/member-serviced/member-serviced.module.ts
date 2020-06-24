import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberServicedPage } from './member-serviced';

@NgModule({
  declarations: [
    MemberServicedPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberServicedPage),
  ],
})
export class MemberServicedPageModule {}
