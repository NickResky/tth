import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './dynamic-content.service';
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { Performance } from './../classes/performance';

@Injectable()
export class StageService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getPerformances() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.performances.shortId)
      .then((modifiedEntries) => {
        const performances = _.map(modifiedEntries, (modifiedEntry) => {
          const performance = new Performance();
          performance.title = modifiedEntry.title;
          performance.description = modifiedEntry.description;
          performance.poster = _.head(modifiedEntry.poster);
          performance.gallery = modifiedEntry.gallery;
          if (_.isNil(modifiedEntry.date) === false) {
            performance.date = new Date(modifiedEntry.date);
          }
          return performance;
        });
        return performances.reverse(); // newest performances should be first
      });
  }

}
