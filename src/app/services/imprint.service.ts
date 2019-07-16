import {Injectable} from '@angular/core';
import {ZenkitCollections} from '../shared/constants/zenkit-collections';
import * as _ from 'lodash';
import {Teacher} from '../classes/teacher';
import { UtilityService, ZenkitDataService, Imprint } from 'webapps-reschke-common';

@Injectable()
export class ImprintService {

  constructor() { }

  getEntries() {
    const listShortId = ZenkitCollections.imprint.shortId;
    return ZenkitDataService.getZenkitListData({
      listShortId: listShortId,
      requiredElements: UtilityService.getRequiredElementsByList(listShortId, ZenkitCollections)
    }).then((zenkitListData) => {
        const entries = _.map(zenkitListData.entries, (modifiedEntry) => {
          const entry = new Imprint();
          entry.title = modifiedEntry.title;
          entry.description = modifiedEntry.description;
          return entry;
        });
        return entries;
      });
  }
}
