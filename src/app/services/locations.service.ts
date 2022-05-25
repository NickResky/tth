import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { ZenkitLocation } from "./../classes/location";
import { LocationData } from "./../classes/location-data";
import { ZenkitCollections } from "./../shared/constants/zenkit-collections";
import { DynamicContentService } from "./dynamic-content.service";

@Injectable()
export class LocationsService {
  constructor(private dynamicContentService: DynamicContentService) {}

  getLocations() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.locations.shortId)
      .then((zenkitListData) => {
        const locations = _.map(zenkitListData.entries, (modifiedEntry) => {
          const location = new ZenkitLocation();
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

        return locations;
        const locationMG = _.find(locations, {
          initials: "MG",
        });
        const locationLB = _.find(locations, {
          initials: "LB",
        });
        const locationData = new LocationData();
        locationData.locationMG = locationMG;
        locationData.locationLB = locationLB;

        return locationData;
      });
  }
}
