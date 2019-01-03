import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdeaFormPage } from './idea-form';

@NgModule({
  declarations: [
    IdeaFormPage,
  ],
  imports: [
    IonicPageModule.forChild(IdeaFormPage),
  ],
})
export class IdeaFormPageModule {}
