import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], condition:any) {
    if (!items) return [];
    if (!condition) return items;
    if (!condition.term) return items;
    if (!condition.fields) return items;

    let queryText = condition.term.toLowerCase().replace(/,|\.|-/g, ' ');
    let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

    return items.filter(item => {
      return this.filterItem(item,queryWords,condition);
    });
  }

  filterItem(item: any, queryWords, condition):boolean{
    let foundStatus = false;
    let fields = condition.fields;
    for(var i=0;i<queryWords.length;i++){
      for(var j=0;j<fields.length;j++){
        let includes = item[fields[j]].toString().toLowerCase().includes(queryWords[i]);
        if (includes) {
          foundStatus = true;
          break;
        }
      }
      if(foundStatus){
        break;
      }
    }
    return foundStatus;
  }
}
