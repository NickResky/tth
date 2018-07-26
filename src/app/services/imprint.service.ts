import {Injectable} from "@angular/core";
import {DynamicContentService} from "./dynamic-content.service";
import {ZenkitCollections} from "../shared/constants/zenkit-collections";
import {Imprint} from "../classes/imprint";
import * as _ from 'lodash';

@Injectable()
export class ImprintService {

  constructor(private dynamicContentService: DynamicContentService) {
  }

  getImprint() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.imprint.shortId)
      .then((modifiedEntries) => {
        const modifiedEntry: any = _.head(modifiedEntries);
        const imprint = new Imprint();
        imprint.title = modifiedEntry.title;
        imprint.description = modifiedEntry.description;
        return imprint;
      });
  }
}
