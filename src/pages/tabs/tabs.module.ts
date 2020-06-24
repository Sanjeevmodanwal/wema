import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SuperTabsModule } from "ionic2-super-tabs";
import { TabsPage } from './tabs';


@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    SuperTabsModule,
  ],

})


export class TabsPageModule {}
