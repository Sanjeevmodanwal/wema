import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFriendsMemberAccountPage } from './add-friends-member-account';

@NgModule({
  declarations: [
    AddFriendsMemberAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFriendsMemberAccountPage),
  ],
})
export class AddFriendsMemberAccountPageModule {}
