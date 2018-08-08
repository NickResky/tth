
import { Component, OnInit } from '@angular/core';
import {DynamicContentService} from "../../services/dynamic-content.service";
import {ModelService} from "../../services/model.service";
import {Imprint} from "../../classes/imprint";
import {ZenkitCollections} from "../../shared/constants/zenkit-collections";
import { Contact } from '../../classes/contact';
import * as _ from 'lodash';


@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

  imprint: string;

  ngOnInit() {
    this.modelService.getContact().then((contact: Contact) => {
      this.imprint = _.get(contact, ['imprint']);
    });
  }

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) {}

}
