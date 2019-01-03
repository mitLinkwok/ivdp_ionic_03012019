import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfflinePage } from './offline';

@NgModule({
  declarations: [
    OfflinePage,
  ],
  imports: [
    IonicPageModule.forChild(OfflinePage),
  ],
  entryComponents:[
    OfflinePage,
  ],
})
export class OfflinePageModule {}
