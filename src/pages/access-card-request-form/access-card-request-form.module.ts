import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccessCardRequestFormPage } from './access-card-request-form';

@NgModule({
  declarations: [
    AccessCardRequestFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AccessCardRequestFormPage),
  ],
})
export class AccessCardRequestFormPageModule {}
