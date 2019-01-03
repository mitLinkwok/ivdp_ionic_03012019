import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AccessCardRequestPage} from './access-card-request';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    AccessCardRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(AccessCardRequestPage),
    PipesModule,
  ],
})
export class AccessCardRequestPageModule {
}
