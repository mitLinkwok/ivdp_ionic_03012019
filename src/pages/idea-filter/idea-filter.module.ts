import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdeaFilterPage } from './idea-filter';

@NgModule({
  declarations: [
    IdeaFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(IdeaFilterPage),
  ],
})
export class IdeaFilterPageModule {}
