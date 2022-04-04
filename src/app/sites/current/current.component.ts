import { UtilityService } from './../../services/utility.service';
import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { BlogPost } from './../../classes/blog-post';
import { Component, OnInit } from '@angular/core';
import { MainPageSection } from '../../classes/main-page-section';
import * as _ from 'lodash';
import { MainPageData } from '../../classes/main-page-data';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  posts: BlogPost[];
  dataPromise: Promise<{}>;
  backgroundImage;
  currentListShortId = ZenkitCollections.current.shortId;
  mainPageListShortId = ZenkitCollections.home.shortId;

  constructor(
    private modelService: ModelService,
    private dynamicContentService: DynamicContentService,
    private utilityService: UtilityService
  ) {

  }

  // testFunction(): Promise<any> {
  //   return this.dynamicContentService
  //   .fetchZenkitListData(ZenkitCollections.current.shortId)
  //   .then((response) => {
  //     return new Promise((resolve, reject) => {
  //       const test = _.get(response, ['elements']);
  //       return resolve(test);
  //     });
  //   });
  // }

  ngOnInit() {
    this.modelService.setPageLoaded(false);

    // this.dataPromise = this.testFunction();

    Promise.all([this.modelService.getPosts(), this.modelService.getMainPageSections()]).then((results) => {
      this.posts = results[0];
      const mainPageData = results[1];
      this.backgroundImage = _.get(mainPageData, ['blogSection', 'image']);
      this.modelService.setPageLoaded(true);
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

  getDateStringLong(date) {
    return this.utilityService.convertDateToStringLong(date);
  }
}
