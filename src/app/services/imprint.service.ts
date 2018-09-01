import {Injectable} from "@angular/core";
import {DynamicContentService} from "./dynamic-content.service";
import {ZenkitCollections} from "../shared/constants/zenkit-collections";
import {Imprint} from "../classes/imprint";
import * as _ from 'lodash';
import {Teacher} from "../classes/teacher";

@Injectable()
export class ImprintService {

  constructor(private dynamicContentService: DynamicContentService) {
  }

  getEntries() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.imprint.shortId)
      .then((zenkitListData) => {
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
