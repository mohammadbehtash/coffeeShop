import { Pipe, PipeTransform } from '@angular/core';
import * as jalaali from 'jalaali-js';
@Pipe({
  name: 'jalaliDateSimple',
  standalone: true
})
export class JalaliDateSimplePipe implements PipeTransform {

  transform(value: string | Date): string {
    const date = new Date(value);
    const jalaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());

   
    return `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`;
  }

}
