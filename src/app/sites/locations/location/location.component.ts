import { ZenkitCollections } from './../../../shared/constants/zenkit-collections';
import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../../services/model.service';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UtilityService, Appointment, Location, LocationData } from 'webapps-reschke-common';

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

  constructor(
    private modelService: ModelService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.modelService.setPageLoaded(false);
    this.sub = this.route.params.subscribe(params => {
      this.locationId = +params['id'];
      this.modelService.getLocationData().then((locationData: LocationData) => {
        if (this.locationId === 0) {
          this.location = locationData.locationMG;
        } else {
          this.location = locationData.locationLB;
        }
        this.modelService.setPageLoaded(true);
      });
   });
  }

  getFileSrc(file) {
    return UtilityService.getFileSrc(_.get(file, ['shortId']), this.locationsListShortId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }

  getSafeUrl(url) {
    const test = this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    return test;
  }
}
