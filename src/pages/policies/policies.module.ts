import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoliciesPage } from './policies';

@NgModule({
  declarations: [
    PoliciesPage,
  ],
  imports: [
    IonicPageModule.forChild(PoliciesPage),
  ],
})
export class PoliciesPageModule {}
