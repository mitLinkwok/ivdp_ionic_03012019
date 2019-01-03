import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {VisitingCardPage} from './visiting-card';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    VisitingCardPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitingCardPage),
    PipesModule,
  ],
})
export class VisitingCardPageModule {
}
