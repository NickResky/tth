import { ZenkitCollections } from './../../../shared/constants/zenkit-collections';
import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../../services/model.service';
import { DynamicContentService } from '../../../services/dynamic-content.service';
import { LocationData } from '../../../classes/location-data';
import { Location } from '../../../classes/location';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  location: Location;
  private sub: any;
  locationId: number;
  locationsListShortId = ZenkitCollections.locations.shortId;

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.locationId = +params['id'];
      this.modelService.getLocationData().then((locationData: LocationData) => {
        if (this.locationId === 0) {
          this.location = locationData.locationMG;
        } else {
          this.location = locationData.locationLB;
        }
      });
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
}
