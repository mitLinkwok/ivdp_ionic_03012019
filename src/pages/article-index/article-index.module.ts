import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleIndexPage } from './article-index';

@NgModule({
  declarations: [
    ArticleIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleIndexPage),
    PipesModule,
  ],
})
export class ArticleIndexPageModule {}
