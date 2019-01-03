import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestRoomRequestPage } from './guest-room-request';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    GuestRoomRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestRoomRequestPage),
    PipesModule,
  ],
})
export class GuestRoomRequestPageModule {}
