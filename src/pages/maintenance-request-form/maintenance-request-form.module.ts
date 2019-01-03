import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintenanceRequestFormPage } from './maintenance-request-form';

@NgModule({
  declarations: [
    MaintenanceRequestFormPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintenanceRequestFormPage),
  ],
})
export class MaintenanceRequestFormPageModule {}
