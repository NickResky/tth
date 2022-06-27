
import { Component, OnInit } from '@angular/core';
import { DynamicContentService } from "../../services/dynamic-content.service";
import { ModelService } from "../../services/model.service";
import { Imprint } from "../../classes/imprint";
import { ZenkitCollections } from "../../shared/constants/zenkit-collections";
import { Contact } from '../../classes/contact';
import * as _ from 'lodash';


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  privacy: string;

  ngOnInit() {
    this.modelService.getContact().then(contact => {
      this.privacy = contact.privacy;
    })
  }

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) { }

}
