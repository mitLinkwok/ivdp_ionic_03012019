import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationeryRequestFormPage } from './stationery-request-form';

@NgModule({
  declarations: [
    StationeryRequestFormPage,
  ],
  imports: [
    IonicPageModule.forChild(StationeryRequestFormPage),
  ],
})
export class StationeryRequestFormPageModule {}
