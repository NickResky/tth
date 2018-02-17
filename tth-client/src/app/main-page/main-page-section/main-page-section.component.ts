import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { MainPageComponent } from './../main-page.component';
import { MainPageSection } from './../../classes/main-page-section';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-main-page-section',
  templateUrl: './main-page-section.component.html',
  styleUrls: ['./main-page-section.component.scss']
})
export class MainPageSectionComponent implements OnInit {

  @Input() sectiondata: MainPageSection;
  section: MainPageSection;
  mainPageListShortId: string = ZenkitCollections.home.shortId;

  constructor(private dynamicContentService: DynamicContentService, private router: Router) { }

  ngOnInit() {
    this.section = this.sectiondata;
  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.mainPageListShortId);
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
