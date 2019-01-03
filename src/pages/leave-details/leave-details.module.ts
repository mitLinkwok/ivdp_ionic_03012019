import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveDetailsPage } from './leave-details';

@NgModule({
  declarations: [
    LeaveDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveDetailsPage),
  ],
})
export class LeaveDetailsPageModule {}
