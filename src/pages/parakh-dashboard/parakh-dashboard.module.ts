import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParakhDashboardPage } from './parakh-dashboard';
import {PipesModule} from "../../pipes/pipes.module";


@NgModule({
  declarations: [
    ParakhDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(ParakhDashboardPage),
    PipesModule
  ],
})
export class ParakhDashboardPageModule {}
