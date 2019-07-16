import { UtilityService, BlogPost, MainPageData, MainPageSection } from 'webapps-reschke-common';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from './../../../services/model.service';
import { ZenkitCollections } from './../../../shared/constants/zenkit-collections';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/Rx';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-current-details',
  templateUrl: './current-details.component.html',
  styleUrls: ['./current-details.component.scss']
})
export class CurrentDetailsComponent implements OnInit {

  dataPromise: Promise<{}>;
  backgroundImage;
  currentListShortId: string;
  blogPost: BlogPost;
  private sub: any;

  constructor(
      private modelService: ModelService,
      private route: ActivatedRoute,
      private domSanitizer: DomSanitizer
    ) {

  }

  ngOnInit() {
    this.modelService.setPageLoaded(false);
    this.currentListShortId = ZenkitCollections.current.shortId;

    this.sub = this.route.params.subscribe(params => {
        const blogPostShortId = params['shortId'];
        this.modelService.getPostByShortId(blogPostShortId).then((blogPost) => {
            this.blogPost = blogPost;
            this.modelService.setPageLoaded(true);
        });
    });
  }

  getFileSrc(file) {
    return UtilityService.getFileSrc(_.get(file, ['shortId']), this.currentListShortId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }

  getPostImageBackgroundStyle(post) {
    const image = _.head(post.images);
    return this.getBackgroundStyle(image);
  }

  getDateStringLong() {
    return UtilityService.convertDateToStringLong(this.blogPost.date);
  }

  getYoutubeLink() {
    const url = 'https://www.youtube.com/embed/'  + this.blogPost.youtubeVideoId;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
