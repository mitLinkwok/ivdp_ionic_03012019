import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdeaPage } from './idea';

@NgModule({
  declarations: [
    IdeaPage,
  ],
  imports: [
    IonicPageModule.forChild(IdeaPage),
    PipesModule,
  ],
})
export class IdeaPageModule {}
