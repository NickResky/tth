import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class UtilityService {

    constructor() { }

    convertStringToUrlId(string) {

        const convertedString = _
          .chain(string.toLowerCase())
          .replace(/ä/g, 'ae')
          .replace(/ö/g, 'oe')
          .replace(/ü/g, 'ue')
          .replace(/ß/g, 'ss')
          .replace(/ /g, '-')
          .replace(/\//g, '')
          .value();

        return convertedString;
    }
}
