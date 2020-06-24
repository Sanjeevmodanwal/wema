import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberAccountPage } from './member-account';

@NgModule({
  declarations: [
    MemberAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberAccountPage),
  ],
})
export class MemberAccountPageModule {}
