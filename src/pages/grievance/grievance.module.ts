import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrievancePage } from './grievance';

@NgModule({
  declarations: [
    GrievancePage,
  ],
  imports: [
    IonicPageModule.forChild(GrievancePage),
    PipesModule,
  ],
})
export class GrievancePageModule {}
