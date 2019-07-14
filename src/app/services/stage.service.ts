import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Performance } from './../classes/performance';
import { UtilityService, ZenkitDataService } from 'webapps-reschke-common';

@Injectable()
export class StageService {

  constructor() { }

  getPerformances() {
    const listShortId = ZenkitCollections.performances.shortId;
    return ZenkitDataService.getZenkitListData({
      listShortId: listShortId,
      requiredElements: UtilityService.getRequiredElementsByList(listShortId, ZenkitCollections)
    }).then((zenkitListData) => {
        const performances = _.map(zenkitListData.entries, (modifiedEntry) => {
          const performance = new Performance();
          performance.shortId = modifiedEntry.shortId;
          performance.title = modifiedEntry.title;
          performance.description = modifiedEntry.description;
          performance.poster = _.head(modifiedEntry.poster);
          performance.gallery = modifiedEntry.gallery;
          if (_.isNil(modifiedEntry.date) === false) {
            performance.date = new Date(modifiedEntry.date);
          }
          if (performance.title && performance.date) {
            const dateString = UtilityService.convertDateToString(performance.date);
            performance.routerLink =
              '/auftritte/' +
              performance.shortId +
              '/' +
              UtilityService.convertStringToUrlId(performance.title) +
              '/' +
              UtilityService.convertStringToUrlId(dateString);
          } else {
            performance.routerLink = '/auftritte/' + performance.shortId;
          }
          return performance;
        });
        return performances.reverse(); // newest performances should be first
      });
  }

}
