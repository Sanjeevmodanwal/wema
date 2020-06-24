import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateMemberProfilePage } from './update-member-profile';

@NgModule({
  declarations: [
    UpdateMemberProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateMemberProfilePage),
  ],
})
export class UpdateMemberProfilePageModule {}
