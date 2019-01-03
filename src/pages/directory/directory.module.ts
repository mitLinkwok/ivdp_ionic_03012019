import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DirectoryPage } from './directory';

@NgModule({
  declarations: [
    DirectoryPage,
  ],
  imports: [
    IonicPageModule.forChild(DirectoryPage),
  ],
})
export class DirectoryPageModule {}
