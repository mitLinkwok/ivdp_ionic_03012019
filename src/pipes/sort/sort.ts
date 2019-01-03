import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

/**
 * Generated class for the SortPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(array: any[], args?: any): any[] {
    return array.sort(function (a, b) {
      if (moment(a[args.property]).isBefore(moment(b[args.property]))) { // <
        //return -1;
        return -1 * args.order;
      } else if (moment(a[args.property]).isAfter(moment(b[args.property]))) { // >
        //return 1;
        return 1 * args.order;
      } else if (moment(a[args.property]).isSame(moment(b[args.property]))) {
        return 0;
      }
    });
  }
}
