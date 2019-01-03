import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveConfirmPage } from './leave-confirm';

@NgModule({
  declarations: [
    LeaveConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveConfirmPage),
  ],
})
export class LeaveConfirmPageModule {}
