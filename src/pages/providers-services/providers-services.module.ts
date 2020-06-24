import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProvidersServicesPage } from './providers-services';

@NgModule({
  declarations: [
    ProvidersServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProvidersServicesPage),
  ],
})
export class ProvidersServicesPageModule {}
