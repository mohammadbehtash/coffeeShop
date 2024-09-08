import { Pipe, PipeTransform } from '@angular/core';
import * as jalaali from 'jalaali-js';
@Pipe({
  name: 'jalaliDate',
  standalone: true
})
export class JalaliDatePipe implements PipeTransform {

  transform(value: string|Date): string {
    const date=new Date(value)
    const jalaliDate=jalaali.toJalaali(date.getFullYear(),date.getMonth()+1,date.getDate())

    const months= ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
    return `${jalaliDate.jd} ${months[jalaliDate.jm - 1]} ${jalaliDate.jy}`
  }

}
