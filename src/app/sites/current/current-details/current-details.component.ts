import { UtilityService } from './../../../services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from './../../../services/model.service';
import { ZenkitCollections } from './../../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../../services/dynamic-content.service';
import { BlogPost } from './../../../classes/blog-post';
import { Component, OnInit } from '@angular/core';
import { MainPageSection } from '../../../classes/main-page-section';
import * as _ from 'lodash';
import { MainPageData } from '../../../classes/main-page-data';
import 'rxjs/Rx';

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
      private dynamicContentService: DynamicContentService,
      private route: ActivatedRoute,
      private utilityService: UtilityService
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
    return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.currentListShortId);
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
    return this.utilityService.convertDateToStringLong(this.blogPost.date);
  }
}
