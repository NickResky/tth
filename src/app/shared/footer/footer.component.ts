import { Component, OnInit } from "@angular/core";
import { ZenkitLocation } from "./../../classes/location";
import { ModelService } from "./../../services/model.service";
import { Contact } from '../../classes/contact';

@Component({
  selector: "app-footer",
  templateUrl: "footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  contact: Contact;
  youtube: string;
  footerContentLoaded = false;
  mainPageContentLoaded = false;

  constructor(private modelService: ModelService) { }

  ngOnInit() {
    this.modelService.isPageLoaded().subscribe((x) => {
      this.mainPageContentLoaded = x;
    });

    Promise.all([
      this.modelService.getContact(),
      this.modelService.getLocations(),
    ]).then((results: any) => {
      this.contact = results[0];
      this.footerContentLoaded = true;
    });
  }
}
