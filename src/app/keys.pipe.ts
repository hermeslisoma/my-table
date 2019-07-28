import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  // get all the keys (table header)
  transform(value, args: string[]): any {
    const keys = [];
    if (value == null) {
        return [];
    }
    for (const key of Object.keys(value)) {
      keys.push(key);
    }
    return keys;
  }
}
