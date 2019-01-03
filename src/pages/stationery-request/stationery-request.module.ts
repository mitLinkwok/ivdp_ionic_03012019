import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {StationeryRequestPage} from './stationery-request';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    StationeryRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(StationeryRequestPage),
    PipesModule,
  ],
})
export class StationeryRequestPageModule {
}
