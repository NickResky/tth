import { RequiredElements } from './../shared/constants/required-elements';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { UtilityService, ZenkitDataService, Contact } from 'webapps-reschke-common';

@Injectable()
export class ContactService {

  constructor() { }

  getContact() {
    const listShortId = ZenkitCollections.contact.shortId;
    return ZenkitDataService.getZenkitListData({
      listShortId: listShortId,
      requiredElements: UtilityService.getRequiredElementsByList(listShortId, ZenkitCollections)
    }).then((zenkitListData) => {
        const modifiedEntry: any = _.head(zenkitListData.entries);
        const contact = new Contact();
        contact.name = modifiedEntry.name;
        contact.email = modifiedEntry.email;
        contact.phone = modifiedEntry.phone;
        contact.imprint = modifiedEntry.imprint;
        return contact;
      });
  }

}
