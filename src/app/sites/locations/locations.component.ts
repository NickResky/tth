import { MainPageData } from './../../classes/main-page-data';
import { LocationData } from './../../classes/location-data';
import { Location } from './../../classes/location';
import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locationsListId = ZenkitCollections.locations.shortId;
  locations: Location[];
  locationMG: Location;
  locationLB: Location;
  locationsListShortId = ZenkitCollections.locations.shortId;
  activeImageContainer;

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) { }

  ngOnInit() {
    this.modelService.getLocationData().then((locationData: LocationData) => {
      this.locationMG = locationData.locationMG;
      this.locationLB = locationData.locationLB;
      this.locations = [locationData.locationMG, locationData.locationLB];
    });
  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.locationsListShortId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }

  mouseEnter(location) {
    const index = _.indexOf(this.locations, location);
    const imageContainerElements = document.getElementsByClassName('courses-overview-bg-image-container');
    this.activeImageContainer = imageContainerElements[index];
    this.activeImageContainer.classList.add('active');
  }

  mouseLeave(course) {
    this.activeImageContainer.classList.remove('active');
  }
}
