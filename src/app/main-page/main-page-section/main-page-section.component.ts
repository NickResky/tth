import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { MainPageComponent } from './../main-page.component';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { UtilityService, MainPageSection } from 'webapps-reschke-common';

@Component({
  selector: 'app-main-page-section',
  templateUrl: './main-page-section.component.html',
  styleUrls: ['./main-page-section.component.scss']
})
export class MainPageSectionComponent implements OnInit {

  @Input() sectiondata: MainPageSection;
  @Input() isFirstSection: boolean;
  section: MainPageSection;
  firstSection: boolean;
  mainPageListShortId: string = ZenkitCollections.home.shortId;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.section = this.sectiondata;
    this.firstSection = this.isFirstSection;
  }

  getFileSrc(file) {
    return UtilityService.getFileSrc(_.get(file, ['shortId']), this.mainPageListShortId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }

  goToSection(section) {
    if (section.routerLink) {
      this.router.navigate([section.routerLink]);
    }
  }
}
