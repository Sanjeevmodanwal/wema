import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderEmailPage } from './provider-email';

@NgModule({
  declarations: [
    ProviderEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderEmailPage),
  ],
})
export class ProviderEmailPageModule {}
