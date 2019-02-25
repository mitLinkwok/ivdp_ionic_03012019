import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeneficiaryProfilePage } from './beneficiary-profile';

@NgModule({
  declarations: [
    BeneficiaryProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(BeneficiaryProfilePage),
  ],
})
export class BeneficiaryProfilePageModule {}
