import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {GuestRoomRequestShowPage} from './guest-room-request-show';
import {IonTagsInputModule} from "ionic-tags-input";
import {TagInputModule} from "ngx-chips";

@NgModule({
  declarations: [
    GuestRoomRequestShowPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestRoomRequestShowPage),
    IonTagsInputModule,
    TagInputModule,

  ],
})
export class GuestRoomRequestShowPageModule {
}
