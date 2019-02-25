import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionTextboxPage } from './question-textbox';

@NgModule({
  declarations: [
    QuestionTextboxPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionTextboxPage),
  ],
})
export class QuestionTextboxPageModule {}
