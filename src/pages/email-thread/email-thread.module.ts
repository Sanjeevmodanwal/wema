import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailThreadPage } from './email-thread';

@NgModule({
  declarations: [
    EmailThreadPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailThreadPage),
  ],
})
export class EmailThreadPageModule {}
