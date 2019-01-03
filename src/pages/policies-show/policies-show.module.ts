import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoliciesShowPage } from './policies-show';

@NgModule({
  declarations: [
    PoliciesShowPage,
  ],
  imports: [
    IonicPageModule.forChild(PoliciesShowPage),
  ],
})
export class PoliciesShowPageModule {}
