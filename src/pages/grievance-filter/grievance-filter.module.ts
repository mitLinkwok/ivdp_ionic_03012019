import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrievanceFilterPage } from './grievance-filter';

@NgModule({
  declarations: [
    GrievanceFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(GrievanceFilterPage),
  ],
})
export class GrievanceFilterPageModule {}
