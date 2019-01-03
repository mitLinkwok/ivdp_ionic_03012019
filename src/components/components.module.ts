import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { TimelineComponent, TimelineItemComponent, TimelineTimeComponent } from './timeline/timeline';
import { CommentComponent } from './comment/comment';
@NgModule({
  declarations: [
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    CommentComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    CommentComponent,
  ]

})
export class ComponentsModule {}
