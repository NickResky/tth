import { UtilityService } from './utility.service';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './dynamic-content.service';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Performance } from './../classes/performance';

@Injectable()
export class StageService {

  constructor(
    private dynamicContentService: DynamicContentService,
    private utilityService: UtilityService
  ) { }

  getPerformances() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.performances.shortId)
      .then((zenkitListData) => {
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
            const dateString = this.utilityService.convertDateToString(performance.date);
            performance.routerLink =
              '/auftritte/' +
              performance.shortId +
              '/' +
              this.utilityService.convertStringToUrlId(performance.title) +
              '/' +
              this.utilityService.convertStringToUrlId(dateString);
          } else {
            performance.routerLink = '/auftritte/' + performance.shortId;
          }
          return performance;
        });
        return performances.reverse(); // newest performances should be first
      });
  }

}
