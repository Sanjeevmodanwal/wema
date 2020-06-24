import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MemberSignupPage } from './member-signup';

@NgModule({
  declarations: [
    MemberSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(MemberSignupPage),
  ],
})
export class MemberSignupPageModule {}
