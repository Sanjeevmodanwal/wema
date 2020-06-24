import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetDirectionPage } from './get-direction';

@NgModule({
  declarations: [
    GetDirectionPage,
  ],
  imports: [
    IonicPageModule.forChild(GetDirectionPage),
  ],
})
export class GetDirectionPageModule {}
