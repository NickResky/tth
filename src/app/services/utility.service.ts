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
        .replace(/12/, 'Dezember')
        .replace(/11/, 'November')
        .replace(/10/, 'October')
        .replace(/9/, 'September')
        .replace(/8/, 'August')
        .replace(/7/, 'July')
        .replace(/6/, 'Juni')
        .replace(/5/, 'Mai')
        .replace(/4/, 'April')
        .replace(/3/, 'März')
        .replace(/2/, 'Februar')
        .replace(/1/, 'Januar')
        .value();

      const dateString = date.getDate().toString() + '. '
        + (monthString).toString() + ' '
        + date.getFullYear();
      return dateString;
  }
}
