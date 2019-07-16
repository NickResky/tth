
import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { ZenkitCollections } from '../../shared/constants/zenkit-collections';
import { Contact, Imprint } from 'webapps-reschke-common';
import * as _ from 'lodash';


@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

  imprint: Imprint;

  ngOnInit() {
    this.modelService.getEntries().then((results: any) => {
      this.imprint = results[0];
    });
  }

  constructor(
    private modelService: ModelService
  ) {}

}
