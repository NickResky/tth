import { MainPageData } from './../classes/main-page-data';
import { ModelService } from './../services/model.service';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './../services/dynamic-content.service';
import { Component, OnInit } from '@angular/core';
import { MainPageService } from './../services/main-page.service';
import { MainPageSection } from './../classes/main-page-section';
import _ from 'lodash';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  mainPageListShortId: string;
  video: string;
  philosophySection: MainPageSection;
  blogSection: MainPageSection;
  coursesSection: MainPageSection;
  performancesSection: MainPageSection;
  teamSection: MainPageSection;
  locationsSection: MainPageSection;
  contactSection: MainPageSection;

  constructor(
    private dynamicContentService: DynamicContentService,
    private modelService: ModelService,
    private domSanitizer: DomSanitizer) { }

    ngOnInit() {
      this.mainPageListShortId = ZenkitCollections.home.shortId;

      this.modelService.getMainPageSections().then((mainPageData: MainPageData) => {
        this.video = mainPageData.video;
        this.philosophySection = mainPageData.philosophySection;
        this.blogSection = mainPageData.blogSection;
        this.coursesSection = mainPageData.coursesSection;
        this.performancesSection = mainPageData.performancesSection;
        this.teamSection = mainPageData.teamSection;
        this.locationsSection = mainPageData.locationsSection;
        this.contactSection = mainPageData.contactSection;
      });
    }

    getSafeUrl(url) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }

    getFileSrc(file) {
      return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.mainPageListShortId);
    }
}
