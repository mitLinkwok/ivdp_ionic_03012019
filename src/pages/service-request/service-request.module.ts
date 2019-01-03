import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceRequestPage } from './service-request';

@NgModule({
  declarations: [
    ServiceRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceRequestPage),
    PipesModule,
  ],
})
export class ServiceRequestPageModule {}
