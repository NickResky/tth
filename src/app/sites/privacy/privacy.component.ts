
import { Component, OnInit } from '@angular/core';
import { ZenkitCollections } from '../../shared/constants/zenkit-collections';
import { Contact, Imprint, ModelService } from 'webapps-reschke-common';
import * as _ from 'lodash';


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  privacy: Imprint;

  ngOnInit() {
    this.modelService.getImprint().then((results: any) => {
      this.privacy = results[1];
    });
  }

  constructor(
    private modelService: ModelService
  ) {}

}
