import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GuestLunchPage} from './guest-lunch';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    GuestLunchPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestLunchPage),
    PipesModule,
  ],
})
export class GuestLunchPageModule {
}
