import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveDetailPage } from './leave-detail';

@NgModule({
  declarations: [
    LeaveDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveDetailPage),
  ],
})
export class LeaveDetailPageModule {}
