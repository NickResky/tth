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
  videoLoaded = false;
  hideVideo = true;
  // player: YT.Player;
  youtubeVideoId: string;
  loadedVideoFraction = 0;

  constructor(
    private dynamicContentService: DynamicContentService,
    private modelService: ModelService,
    private domSanitizer: DomSanitizer) { }

    ngOnInit() {
      this.modelService.setPageLoaded(false);

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

        if (window.innerWidth < 768) {
          this.modelService.setPageLoaded(true);
        } else {
          setTimeout(() => {
            this.modelService.setPageLoaded(true);
          }, 4000);
        }
      });

      // const options = {
      //   id: 246740715,
      //   loop: true,
      //   autoplay: true,
      //   muted: true
      // };

      // const player = new Player('video-iframe', options);

      // const self = this;

      // player.on('play', function() {
      //   console.log('played the video!');
      //   const iframe = document.querySelector('iframe');
      //   if (iframe !== null) {
      //     iframe.style.width = '100%';
      //     iframe.style.height = '100%';
      //   }
      //   setTimeout(function(){
      //     self.videoLoaded = true;
      //    }, 3500);
      // });
    }

    // savePlayer(player) {
    //   this.player = player;
    //   this.player.playVideo();
    // }

    // onStateChange(event) {
    //   /*
    //     Player state 0 = ended
    //     Player state 1 = play
    //     Player state 2 = pause
    //   */
    //   console.log('player state: ' + this.player.getPlayerState());
    //   if (this.player.getPlayerState() === 1) {
    //     this.modelService.setPageLoaded(true);
    //     this.hideVideo = false;
    //   }
    //   if (this.player.getPlayerState() === 2) {
    //     this.modelService.setPageLoaded(true);
    //     this.hideVideo = true;
    //   }
    //   if (this.player.getPlayerState() === 0) {
    //     this.player.playVideo();
    //   }
    //   const loadedFraction = event.target.getVideoLoadedFraction();
    // }

    // getSafeUrl(url) {
    //   return this.domSanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/246740715'  + '?wmode=opaque&api=1&autoplay=1&background=1&loop=1&player_id=video_video_817&title=0&byline=0&portrait=0&color=3ab9ff');
    // }

    getFileSrc(file) {
      return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.mainPageListShortId);
    }

    getPlayerStyle() {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        rel: 0
      };
    }

    getPlayerVars() {
      return {
        controls: 0,
        showinfo: 0,
        autoplay: 1,
        loop: 1,
        playlist: 'zLtXD9J2ZhU',
        frameborder: '0',
        allow: 'autoplay',
        modestbranding: 1,
        'ytp-pause-overlay': 0
      };
    }

    getYoutubeLink() {
      // tslint:disable-next-line:max-line-length
      const url = 'https://www.youtube.com/embed/'  + this.youtubeVideoId + '?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1&amp;loop=1&amp;playlist=' + this.youtubeVideoId;
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
