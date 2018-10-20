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
  videoFileSection: MainPageSection;
  titleImageSection: MainPageSection;

  contentLoaded = false;
  loadVideoTimeout = 8000;
  removeVideo = false;
  titleImageLoaded = false;
  displayTitleImage = false;
  videoLoaded = false;
  showTitleImageTimeout = 4000;
  showTitleImageTimeoutPassed = false;
  playVideo = false;
  pageLoaded = false;
  youtubeVideoId: string;
  showTitleTimeout = false;
  hideTitle = false;
  videoElement: any;

  constructor(
    private dynamicContentService: DynamicContentService,
    private modelService: ModelService,
    private domSanitizer: DomSanitizer) { }

    ngOnInit() {
      this.pageLoaded = this.modelService.setPageLoaded(false);

      this.mainPageListShortId = ZenkitCollections.home.shortId;

      this.modelService.getMainPageSections().then((mainPageData: MainPageData) => {

        this.youtubeVideoId = mainPageData.youtubeVideoId;
        this.philosophySection = mainPageData.philosophySection;
        this.blogSection = mainPageData.blogSection;
        this.coursesSection = mainPageData.coursesSection;
        this.performancesSection = mainPageData.performancesSection;
        this.teamSection = mainPageData.teamSection;
        this.locationsSection = mainPageData.locationsSection;
        this.contactSection = mainPageData.contactSection;
        this.videoFileSection = mainPageData.videoFileSection;
        this.titleImageSection = mainPageData.titleImageSection;

        this.contentLoaded = true;

        // remove video timeout
        setTimeout(() => {
          if (this.videoLoaded === false) {
            this.removeVideo = true;
          }
        }, this.loadVideoTimeout);

        // play video after this timeout
        setTimeout(() => {
          this.showTitleImageTimeoutPassed = true;
        }, this.showTitleImageTimeout);
      });
    }

    getFileSrc(file) {
      return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.mainPageListShortId);
    }

    setVideoElement() {
      if (_.isNil(this.videoElement)) {
        this.videoElement = document.getElementById('video');
      }
      return this.videoElement;
    }

    getYoutubeLink() {
      // tslint:disable-next-line:max-line-length
      const url = 'https://www.youtube.com/embed/'  + this.youtubeVideoId + '?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;loop=1&amp;mute=1&amp;playlist=' + this.youtubeVideoId;
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }

    getBackgroundStyle(image) {
      const backgroundStyle = {
        'background-image': 'url(' + this.getFileSrc(image) + ')'
      };
      return backgroundStyle;
    }

    playVideoButtonClicked() {
      this.hideTitle = true;
      this.displayTitleImage = false;
    }

    imageLoaded() {
      console.log('title image loaded!');
      this.pageLoaded = this.modelService.setPageLoaded(true);
      this.titleImageLoaded = true;
      this.checkIfTitleImageShouldBeDisplayed();
    }

    checkIfTitleImageShouldBeDisplayed() {
      if (this.showTitleImageTimeoutPassed) {
        this.displayTitleImage = true;
      } else {
        setTimeout(() => {
          this.checkIfTitleImageShouldBeDisplayed();
        }, 200);
      }
    }

    videoDataLoaded() {
      console.log('title video loaded!');
      this.videoLoaded = true;
      this.checkIfVideoShouldBePlayed();
    }

    checkIfVideoShouldBePlayed() {
      if (this.showTitleImageTimeoutPassed) {
        this.setVideoElement();
        this.videoElement.muted = true;
        this.videoElement.autoplay = true;
        this.videoElement.play();
        this.playVideo = true;
      } else {
        setTimeout(() => {
          this.checkIfVideoShouldBePlayed();
        }, 200);
      }
    }
}
