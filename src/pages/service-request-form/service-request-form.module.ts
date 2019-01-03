import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceRequestFormPage } from './service-request-form';

@NgModule({
  declarations: [
    ServiceRequestFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceRequestFormPage),
  ],
})
export class ServiceRequestFormPageModule {}
