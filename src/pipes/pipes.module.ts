import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { SafePipe } from './safe/safe';
import { SortPipe } from './sort/sort';
import { SafeHtmlPipe } from './safe-html/safe-html';
@NgModule({
	declarations: [SearchPipe,
    SafePipe,
    SortPipe,
    SafeHtmlPipe],
	imports: [],
	exports: [SearchPipe,
    SafePipe,
    SortPipe,
    SafeHtmlPipe]
})
export class PipesModule {}
