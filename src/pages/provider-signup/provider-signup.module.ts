import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderSignupPage } from './provider-signup';

@NgModule({
  declarations: [
    ProviderSignupPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderSignupPage),
  ],
})
export class ProviderSignupPageModule {}
