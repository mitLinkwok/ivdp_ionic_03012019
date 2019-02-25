import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchBeneficiryPage } from './search-beneficiry';

@NgModule({
  declarations: [
    SearchBeneficiryPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchBeneficiryPage),
  ],
})
export class SearchBeneficiryPageModule {}
