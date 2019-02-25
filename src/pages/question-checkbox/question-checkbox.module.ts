import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionCheckboxPage } from './question-checkbox';

@NgModule({
  declarations: [
    QuestionCheckboxPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionCheckboxPage),
  ],
})
export class QuestionCheckboxPageModule {}
