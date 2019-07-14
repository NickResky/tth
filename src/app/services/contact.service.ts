import { UtilityService } from './utility.service';
import { RequiredElements } from './../shared/constants/required-elements';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { Contact } from './../classes/contact';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import * as wrc from 'webapps-reschke-common';

@Injectable()
export class ContactService {

  constructor() { }

  getContact() {
    const listShortId = ZenkitCollections.contact.shortId;
    return wrc.getZenkitListData({
      listShortId: listShortId,
      requiredElements: UtilityService.getRequiredElementsByList(listShortId)
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
