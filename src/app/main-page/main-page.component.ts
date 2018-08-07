import { MainPageData } from './../classes/main-page-data';
import { ModelService } from './../services/model.service';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './../services/dynamic-content.service';
import { Component, OnInit } from '@angular/core';
import { MainPageService } from './../services/main-page.service';
import { MainPageSection } from './../classes/main-page-section';
import * as _ from 'lodash';
import { SafeResourceUrl } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import Player from '@vimeo/player';

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
  videoLoaded = true;

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

      const options = {
        id: 246740715,
        loop: true,
        autoplay: true
      };

      const player = new Player('video-iframe', options);

      const self = this;

      player.on('play', function() {
        console.log('played the video!');
        const iframe = document.querySelector('iframe');
        if (iframe !== null) {
          iframe.style.width = '100%';
          iframe.style.height = '100%';
        }
        setTimeout(function(){
          self.videoLoaded = true;
         }, 3500);
    });
    }

    getSafeUrl(url) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/246740715'  + '?wmode=opaque&api=1&autoplay=1&background=1&loop=1&player_id=video_video_817&title=0&byline=0&portrait=0&color=3ab9ff');
    }

    getFileSrc(file) {
      return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.mainPageListShortId);
    }
}
