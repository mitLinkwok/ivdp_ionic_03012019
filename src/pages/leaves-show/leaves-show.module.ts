import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeavesShowPage } from './leaves-show';

@NgModule({
  declarations: [
    LeavesShowPage,
  ],
  imports: [
    IonicPageModule.forChild(LeavesShowPage),
  ],
})
export class LeavesShowPageModule {}
