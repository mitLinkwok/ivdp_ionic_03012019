import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrievanceFormPage } from './grievance-form';

@NgModule({
  declarations: [
    GrievanceFormPage,
  ],
  imports: [
    IonicPageModule.forChild(GrievanceFormPage),
  ],
})
export class GrievanceFormPageModule {}
