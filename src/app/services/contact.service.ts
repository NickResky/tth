import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './../services/dynamic-content.service';
import { Contact } from './../classes/contact';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class ContactService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getContact() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.contact.shortId)
      .then((zenkitListData) => {
        const modifiedEntry: any = _.head(zenkitListData.entries);
        const contact = new Contact();
        contact.name = modifiedEntry.name;
        contact.email = modifiedEntry.email;
        contact.phone = modifiedEntry.phone;
        contact.street = modifiedEntry.street;
        contact.zipAndCity = modifiedEntry.zipAndCity;
        contact.imprint = modifiedEntry.imprint;
        contact.privacy = modifiedEntry.privacy;
        return contact;
      });
  }

}
