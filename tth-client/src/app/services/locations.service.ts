import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './dynamic-content.service';
import { Injectable } from '@angular/core';
import { Location } from './../classes/location';
import { LocationData } from './../classes/location-data';
import _ from 'lodash';

@Injectable()
export class LocationsService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getLocationData() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.locations.shortId)
      .then((modifiedEntries) => {
        const locations = _.map(modifiedEntries, (modifiedEntry) => {
          const location = new Location();
          location.name = modifiedEntry.name;
          location.addressName = modifiedEntry.addressName;
          location.addressStreet = modifiedEntry.addressStreet;
          location.addressZIP = modifiedEntry.addressZIP;
          location.addressCity = modifiedEntry.addressCity;
          location.description = modifiedEntry.description;
          location.gallery = modifiedEntry.gallery;
          location.embed = modifiedEntry.embed;
          return location;
        });
        const locationMG = _.find(locations, {
          name: 'Markgröningen'
        });
        const locationLB = _.find(locations, {
          name: 'Ludwigsburg'
        });
        const locationData = new LocationData();
        locationData.locationMG = locationMG;
        locationData.locationLB = locationLB;
        
        return locationData;
      });
  }

}
