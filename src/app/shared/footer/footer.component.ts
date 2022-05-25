import { Component, OnInit } from "@angular/core";
import { ZenkitLocation } from "./../../classes/location";
import { ModelService } from "./../../services/model.service";

@Component({
  selector: "app-footer",
  templateUrl: "footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  locationMG: ZenkitLocation;
  locationLB: ZenkitLocation;
  name: string;
  email: string;
  phone: string;
  facebook: string;
  youtube: string;
  footerContentLoaded = false;
  mainPageContentLoaded = false;

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.modelService.isPageLoaded().subscribe((x) => {
      this.mainPageContentLoaded = x;
    });

    Promise.all([
      this.modelService.getContact(),
      this.modelService.getLocations(),
    ]).then((results: any) => {
      const contact = results[0];
      const locationData = results[1];
      this.name = contact.name;
      this.email = contact.email;
      this.phone = contact.phone;
      this.locationMG = locationData.locationMG;
      this.locationLB = locationData.locationLB;
      this.footerContentLoaded = true;
    });
  }
}
