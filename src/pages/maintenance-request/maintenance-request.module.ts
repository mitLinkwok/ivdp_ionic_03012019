import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintenanceRequestPage } from './maintenance-request';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    MaintenanceRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintenanceRequestPage),
    PipesModule,
  ],
})
export class MaintenanceRequestPageModule {}
