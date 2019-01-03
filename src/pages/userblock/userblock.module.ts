import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserblockPage } from './userblock';

@NgModule({
  declarations: [
    UserblockPage,
  ],
  imports: [
    IonicPageModule.forChild(UserblockPage),
  ],
  entryComponents: [
    UserblockPage,
  ],
})
export class UserblockPageModule {}
