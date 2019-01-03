import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdeaShowPage } from './idea-show';
import { IonTagsInputModule } from "ionic-tags-input";
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IdeaShowPage,
  ],
  imports: [
    IonicPageModule.forChild(IdeaShowPage),
    IonTagsInputModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class IdeaShowPageModule {}
