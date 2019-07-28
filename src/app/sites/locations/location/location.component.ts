import { ZenkitCollections } from './../../../shared/constants/zenkit-collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UtilityService, Appointment, Location, LocationData, ModelService } from 'webapps-reschke-common';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  location: Location;
  private sub: any;
  locationShortId: string;
  locationsListShortId = ZenkitCollections.locations.shortId;

  constructor(
    private modelService: ModelService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.modelService.setPageLoaded(false);
    this.sub = this.route.params.subscribe(params => {
      this.locationShortId = params['locationShortId'];
      this.modelService.getLocationByShortId(this.locationShortId).then((location: Location) => {
        this.location = location;
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
