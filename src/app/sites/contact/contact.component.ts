import { MainPageData } from './../../classes/main-page-data';
import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { Contact } from './../../classes/contact';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  backgroundImage;
  contact: Contact = undefined;
  contactListShortId = ZenkitCollections.contact.shortId;
  mainPageListShortId = ZenkitCollections.home.shortId;

  personInfo = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    course: new FormControl(),
    text: new FormControl(),
    age: new FormControl()
  });

  constructor(
    private modelService: ModelService
  ) { }

  ngOnInit() {
    this.modelService.setPageLoaded(false);

    Promise.all([this.modelService.getContact(), this.modelService.getMainPageSections()]).then((results: any) => {
      this.contact = results[0];
      this.backgroundImage = _.get(results[1], ['contactSection', 'image']);
      this.modelService.setPageLoaded(true);
    });
  }

  getFileSrc(file) {
    return UtilityService.getFileSrc(_.get(file, ['shortId']), this.contactListShortId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }
}
