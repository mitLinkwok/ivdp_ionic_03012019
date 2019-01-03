import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitingCardFormPage } from './visiting-card-form';

@NgModule({
  declarations: [
    VisitingCardFormPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitingCardFormPage),
  ],
})
export class VisitingCardFormPageModule {}
