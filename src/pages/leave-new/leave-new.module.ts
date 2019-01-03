import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveNewPage } from './leave-new';

@NgModule({
  declarations: [
    LeaveNewPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveNewPage),
  ],
})
export class LeaveNewPageModule {}
