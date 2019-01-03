import { PipesModule } from './../../pipes/pipes.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleShowPage } from './article-show';

@NgModule({
  declarations: [
    ArticleShowPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleShowPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class ArticleShowPageModule {}
