import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestRoomRequestFormPage } from './guest-room-request-form';

@NgModule({
  declarations: [
    GuestRoomRequestFormPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestRoomRequestFormPage),
  ],
})
export class GuestRoomRequestFormPageModule {}
