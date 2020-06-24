import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyProviderProfilePage } from './company-provider-profile';

@NgModule({
  declarations: [
    CompanyProviderProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyProviderProfilePage),
  ],
})
export class CompanyProviderProfilePageModule {}
