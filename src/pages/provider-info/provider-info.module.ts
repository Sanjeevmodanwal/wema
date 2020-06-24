import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProviderInfoPage } from './provider-info';

@NgModule({
  declarations: [
    ProviderInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProviderInfoPage),
  ],
})
export class ProviderInfoPageModule {}
