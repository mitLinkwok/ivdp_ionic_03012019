import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrievanceShowPage } from './grievance-show';
import { ComponentsModule } from '../../components/components.module';
import { IonTagsInputModule } from "ionic-tags-input";
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GrievanceShowPage,
  ],
  imports: [
    IonicPageModule.forChild(GrievanceShowPage),
    ComponentsModule,
    IonTagsInputModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class GrievanceShowPageModule {}
