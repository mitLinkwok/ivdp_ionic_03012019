import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveFilterPage } from './leave-filter';

@NgModule({
  declarations: [
    LeaveFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveFilterPage),
  ],
})
export class LeaveFilterPageModule {}
