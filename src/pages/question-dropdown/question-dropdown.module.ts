import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionDropdownPage } from './question-dropdown';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    QuestionDropdownPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionDropdownPage),PipesModule,
  ],
})
export class QuestionDropdownPageModule {}
