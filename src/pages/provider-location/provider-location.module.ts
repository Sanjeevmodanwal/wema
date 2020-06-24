import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderLocationPage } from './provider-location';

@NgModule({
  declarations: [
    ProviderLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderLocationPage),
  ],
})
export class ProviderLocationPageModule {}
