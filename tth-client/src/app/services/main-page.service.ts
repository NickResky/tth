import { CourseInformation } from './../classes/course-information';
import { MainPageComponent } from './../main-page/main-page.component';
import { MainPageSectionTypes } from './../shared/constants/main-page-section-types';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './dynamic-content.service';
import { Injectable } from '@angular/core';
import { MainPageSection } from './../classes/main-page-section';
import _ from 'lodash';
import { MainPageData } from '../classes/main-page-data';

@Injectable()
export class MainPageService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getMainPageSections() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.home.shortId)
      .then((modifiedEntries) => {
        const mainPageSections = _.map(modifiedEntries, (modifiedEntry) => {
          const mainPageSection = new MainPageSection();
          mainPageSection.title = modifiedEntry.title;
          mainPageSection.description = modifiedEntry.description;
          mainPageSection.image = _.head(modifiedEntry.image);
          mainPageSection.youtubeEmbed = modifiedEntry.videoEmbed;

          const sectionType = _.find(MainPageSectionTypes, {
            name: modifiedEntry.title
          });
          mainPageSection.cssClass = _.get(sectionType, ['cssClass']);
          mainPageSection.routerLink =  _.get(sectionType, ['routerLink']);
          return mainPageSection;
        });

        const getSection = function(sectionName) {
          const section = _.head(_.remove(mainPageSections, {
            title: sectionName
          }));

          if (_.isNil(section)) {
            console.log('Section "' + sectionName + '" was not found');
          }

          return section;
        };

        const videoSection = getSection('Video');

        const philosophySection = getSection('Philosophie');

        const blogSection = getSection('Neuigkeiten');

        const coursesSection = getSection('Kurse');

        const performancesSection = getSection('Auftritte');

        const teamSection = getSection('Team');

        const locationsSection = getSection('Standorte');

        const contactSection = getSection('Kontakt');

        const mainPageData = new MainPageData();
        mainPageData.video = _.get(videoSection, ['youtubeEmbed']);
        mainPageData.philosophySection = philosophySection;
        mainPageData.blogSection = blogSection;
        mainPageData.coursesSection = coursesSection;
        mainPageData.performancesSection = performancesSection;
        mainPageData.teamSection = teamSection;
        mainPageData.locationsSection = locationsSection;
        mainPageData.contactSection = contactSection;
        return mainPageData;
      });
    }

}
