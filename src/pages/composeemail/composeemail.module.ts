import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComposeemailPage } from './composeemail';

@NgModule({
  declarations: [
    ComposeemailPage,
  ],
  imports: [
    IonicPageModule.forChild(ComposeemailPage),
  ],
})
export class ComposeemailPageModule {}
