import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './dynamic-content.service';
import { Injectable } from '@angular/core';
import { Location } from './../classes/location';
import { LocationData } from './../classes/location-data';
import * as _ from 'lodash';

@Injectable()
export class LocationsService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getLocationData() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.locations.shortId)
      .then((modifiedEntries) => {
        const locations = _.map(modifiedEntries, (modifiedEntry) => {
          const location = new Location();
          location.uuid = modifiedEntry.uuid;
          location.name = modifiedEntry.name;
          location.addressName = modifiedEntry.addressName;
          location.addressStreet = modifiedEntry.addressStreet;
          location.addressZIP = modifiedEntry.addressZIP;
          location.addressCity = modifiedEntry.addressCity;
          location.description = modifiedEntry.description;
          location.image = _.head(modifiedEntry.image);
          location.gallery = modifiedEntry.gallery;
          location.embed = modifiedEntry.embed;
          location.initials = modifiedEntry.initials;
          location.consultationTime1 = modifiedEntry.consultationTime1;
          location.consultationTime2 = modifiedEntry.consultationTime2;
          location.consultationTime3 = modifiedEntry.consultationTime3;
          return location;
        });
        const locationMG = _.find(locations, {
          initials: 'MG'
        });
        const locationLB = _.find(locations, {
          initials: 'LB'
        });
        const locationData = new LocationData();
        locationData.locationMG = locationMG;
        locationData.locationLB = locationLB;

        return locationData;
      });
  }

}
