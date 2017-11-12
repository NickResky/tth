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
          mainPageSection.cssClass = sectionType.cssClass;
          mainPageSection.routerLink = sectionType.routerLink;
          return mainPageSection;
        });

        const videoSection = _.head(_.remove(mainPageSections, {
          title: 'Video'
        }));

        const philosophySection = _.head(_.remove(mainPageSections, {
          title: 'Philosophie'
        }));

        const blogSection = _.head(_.remove(mainPageSections, {
          title: 'Aktuelles'
        }));

        const coursesSection = _.head(_.remove(mainPageSections, {
          title: 'Kurse'
        }));

        const performancesSection = _.head(_.remove(mainPageSections, {
          title: 'Bühne'
        }));

        const teamSection = _.head(_.remove(mainPageSections, {
          title: 'Team'
        }));

        const locationsSection = _.head(_.remove(mainPageSections, {
          title: 'Standorte'
        }));

        const contactSection = _.head(_.remove(mainPageSections, {
          title: 'Kontakt'
        }));

        const mainPageData = new MainPageData();
        mainPageData.video = videoSection.youtubeEmbed;
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
