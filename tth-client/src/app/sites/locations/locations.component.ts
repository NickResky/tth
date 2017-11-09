import { LocationData } from './../../classes/location-data';
import { Location } from './../../classes/location';
import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locationMG: Location;
  locationLB: Location;
  locationsListShortId = undefined;

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) { }

  ngOnInit() {
    this.locationsListShortId = ZenkitCollections.locations.shortId;

    this.modelService.getLocationData().then((locationData: LocationData) => {
      this.locationMG = locationData.locationMG;
      this.locationLB = locationData.locationLB;
    });
  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(file.shortId, this.locationsListShortId);
  }

}
