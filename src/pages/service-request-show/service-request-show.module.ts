import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceRequestShowPage } from './service-request-show';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ServiceRequestShowPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceRequestShowPage),
    ComponentsModule,
  ],
})
export class ServiceRequestShowPageModule {}
