import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { MainPageData } from '../classes/main-page-data';
import { MainPageSection } from './../classes/main-page-section';
import { MainPageSectionTypes } from './../shared/constants/main-page-section-types';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './dynamic-content.service';

@Injectable()
export class MainPageService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getMainPageSections() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.home.shortId)
      .then((zenkitListData) => {
        const mainPageSections = _.map(zenkitListData.entries, (modifiedEntry) => {
          const mainPageSection = new MainPageSection();
          mainPageSection.title = modifiedEntry.title;
          mainPageSection.description = modifiedEntry.description;
          mainPageSection.image = _.head(modifiedEntry.image);
          mainPageSection.youtubeVideoId = modifiedEntry.youtubeVideoId;
          mainPageSection.prices = modifiedEntry.prices;
          mainPageSection.speechBubble = modifiedEntry.speechBubble.length ? modifiedEntry.speechBubble : undefined;
          mainPageSection.speechBubbleImage = _.head(modifiedEntry.speechBubbleImage);

          const sectionType = _.find(MainPageSectionTypes, {
            name: modifiedEntry.title
          });
          mainPageSection.cssClass = _.get(sectionType, ['cssClass']);
          mainPageSection.routerLink = _.get(sectionType, ['routerLink']);
          return mainPageSection;
        });

        const getSection = function (sectionName) {
          const section = _.head(_.remove(mainPageSections, {
            title: sectionName
          }));

          if (_.isNil(section)) {
            console.log('Section "' + sectionName + '" was not found');
          }

          return section;
        };

        const videoSection = getSection('Video');

        const rueckenFitSection = getSection('Rücken-Fit');

        const blogSection = getSection('Neuigkeiten');

        const nordicWalkingSection = getSection('Nordic-Walking');

        const ernaehrungsberatungSection = getSection('Ernährungsberatung');

        const contactSection = getSection('Kontakt');

        const videoFileSection = getSection('Videodatei');

        const titleImageSection = getSection('Titelbild');

        const mainPageData = new MainPageData();
        mainPageData.youtubeVideoId = _.get(videoSection, ['youtubeVideoId']);
        mainPageData.rueckenFitSection = rueckenFitSection;
        mainPageData.blogSection = blogSection;
        mainPageData.nordicWalkingSection = nordicWalkingSection;
        mainPageData.ernaehrungsberatungSection = ernaehrungsberatungSection;
        mainPageData.contactSection = contactSection;
        mainPageData.videoFileSection = videoFileSection;
        mainPageData.titleImageSection = titleImageSection;

        return mainPageData;
      });
  }

}
