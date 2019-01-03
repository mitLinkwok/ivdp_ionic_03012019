import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestLunchFormPage } from './guest-lunch-form';

@NgModule({
  declarations: [
    GuestLunchFormPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestLunchFormPage),
  ],
})
export class GuestLunchFormPageModule {}
