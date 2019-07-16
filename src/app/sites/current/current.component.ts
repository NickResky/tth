import { UtilityService, BlogPost, MainPageData, MainPageSection } from 'webapps-reschke-common';
import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/Rx';

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
  ) {

  }

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

  getDateStringLong(date) {
    return UtilityService.convertDateToStringLong(date);
  }
}
