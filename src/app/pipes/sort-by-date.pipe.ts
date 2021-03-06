import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";
import { DataFormatService } from '../services/data-format.service';

@Pipe({
  name: 'sortByDate',
  pure: true
})
export class SortByDatePipe implements PipeTransform {

  constructor(private DFService:DataFormatService){

  }

  transform(array: any[], args: string): any {
    // console.log(array, args);
    if (typeof args[0] === "undefined") {
      return array;
    }
    array = _.sortBy(array, (a: any, b: any) => {
      return new Date(a.matchDate);

      // return new Date(this.DFService.customDateFormat(a.matchDate));
    });
    return array;
  }

}
