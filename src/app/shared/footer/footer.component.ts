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

  constructor(private modelService: ModelService) { }

  ngOnInit() {
    this.modelService.getContact().then((contact: Contact) => {
      this.name = contact.name;
      this.email = contact.email;
      this.phone = contact.phone;
    });

    this.modelService.getLocationData().then((locationData: LocationData) => {
      this.locationMG = locationData.locationMG;
      this.locationLB = locationData.locationLB;
    });
  }

}
