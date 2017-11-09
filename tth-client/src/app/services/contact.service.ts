import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './../services/dynamic-content.service';
import { Contact } from './../classes/contact';
import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable()
export class ContactService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getContact() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.contact.shortId)
      .then((modifiedEntries) => {
        const modifiedEntry = _.head(modifiedEntries);
        const contact = new Contact();
        contact.name = modifiedEntry.name;
        contact.email = modifiedEntry.email;
        contact.phone = modifiedEntry.phone;
        return contact;
      });
  }

}
