import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
import { ZenkitLocation } from "./../../classes/location";
import { LocationData } from "./../../classes/location-data";
import { DynamicContentService } from "./../../services/dynamic-content.service";
import { ModelService } from "./../../services/model.service";
import { ZenkitCollections } from "./../../shared/constants/zenkit-collections";

@Component({
  selector: "app-locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.scss"],
})
export class LocationsComponent implements OnInit {
  locationsListId = ZenkitCollections.locations.shortId;
  locations: ZenkitLocation[];
  locationMG: ZenkitLocation;
  locationLB: ZenkitLocation;
  locationsListShortId = ZenkitCollections.locations.shortId;
  activeImageContainer;

  constructor(
    private modelService: ModelService,
    private dynamicContentService: DynamicContentService
  ) {}

  ngOnInit() {
    this.modelService.setPageLoaded(false);
    this.modelService.getLocations().then((locationData: LocationData) => {
      this.locationMG = locationData.locationMG;
      this.locationLB = locationData.locationLB;
      this.locations = [locationData.locationMG, locationData.locationLB];
      this.modelService.setPageLoaded(true);
    });
  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(
      _.get(file, ["shortId"]),
      this.locationsListShortId
    );
  }

  getBackgroundStyle(image) {
    return {
      "background-image": "url(" + this.getFileSrc(image) + ")",
    };
  }

  mouseEnter(location) {
    const index = _.indexOf(this.locations, location);
    const imageContainerElements = document.getElementsByClassName(
      "courses-overview-bg-image-container"
    );
    this.activeImageContainer = imageContainerElements[index];
    this.activeImageContainer.classList.add("active");
  }

  mouseLeave(course) {
    this.activeImageContainer.classList.remove("active");
  }
}
