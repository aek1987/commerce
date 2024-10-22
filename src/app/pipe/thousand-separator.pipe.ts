import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandSeparator'
})
export class ThousandSeparatorPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) return '';
    // Ajouter des espaces comme séparateurs des milliers
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' DA';
  }
}
