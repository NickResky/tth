import { Location } from './../../classes/location';
import { Contact } from './../../classes/contact';
import { ModelService } from './../../services/model.service';
import { Component, OnInit } from '@angular/core';
import { LocationData } from '../../classes/location-data';
import * as _ from 'lodash';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  locationMG: Location;
  locationLB: Location;
  name: string;
  email: string;
  phone: string;
  facebook: string;
  youtube: string;
  footerLoaded = false;

  constructor(private modelService: ModelService) { }

  ngOnInit() {
    Promise.all([this.modelService.getContact(), this.modelService.getLocationData()]).then((results: any) => {
      const contact = results[0];
      const locationData = results[1];
      this.name = contact.name;
      this.email = contact.email;
      this.phone = contact.phone;
      this.locationMG = locationData.locationMG;
      this.locationLB = locationData.locationLB;
      this.footerLoaded = true;
    });
  }

}
