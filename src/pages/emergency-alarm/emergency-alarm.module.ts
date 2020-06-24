import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmergencyAlarmPage } from './emergency-alarm';

@NgModule({
  declarations: [
    EmergencyAlarmPage,
  ],
  imports: [
    IonicPageModule.forChild(EmergencyAlarmPage),
  ],
})
export class EmergencyAlarmPageModule {}
