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
          .replace(/\./g, '-')
          .replace(/\//g, '')
          .value();

        return convertedString;
    }

    convertDateToString(date) {
        if (_.isNil(date)) {
          return undefined;
        }
        const dateString = date.getDate().toString() + '.'
          + (date.getMonth() + 1).toString() + '.'
          + date.getFullYear();
        return dateString;
    }

    convertDateToStringLong(date) {
      if (_.isNil(date)) {
        return undefined;
      }
      const monthString = _
        .chain(date.getMonth().toString())
        .replace(/11/, 'Dezember')
        .replace(/10/, 'November')
        .replace(/9/, 'October')
        .replace(/8/, 'September')
        .replace(/7/, 'August')
        .replace(/6/, 'July')
        .replace(/5/, 'Juni')
        .replace(/4/, 'Mai')
        .replace(/3/, 'April')
        .replace(/2/, 'März')
        .replace(/1/, 'Februar')
        .replace(/0/, 'Januar')
        .value();

      const dateString = date.getDate().toString() + '. '
        + (monthString).toString() + ' '
        + date.getFullYear();
      return dateString;
  }
}
