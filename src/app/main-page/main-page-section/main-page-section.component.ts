import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { MainPageComponent } from './../main-page.component';
import { MainPageSection } from './../../classes/main-page-section';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Parser, getParser } from 'bowser';

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
  browser: Parser.Parser;
  isIOS = false;

  constructor(private dynamicContentService: DynamicContentService, private router: Router) { }

  ngOnInit() {
    this.section = this.sectiondata;
    this.firstSection = this.isFirstSection;

    this.browser = getParser(window.navigator.userAgent);
    this.isIOS = this.browser.is('iOS');
    console.log('iOS Device detected: ' + this.isIOS);
  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.mainPageListShortId);
  }

  getBackgroundStyle(image) {
    const style = {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
    // if (!this.isIOS) {
    //   style['background-attachment'] = 'fixed';
    // }
    return style;
  }

  goToSection(section) {
    if (section.routerLink) {
      this.router.navigate([section.routerLink]);
    }
  }
}
