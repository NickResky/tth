import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { BlogPost } from './../../classes/blog-post';
import { Component, OnInit } from '@angular/core';
import { MainPageSection } from '../../classes/main-page-section';
import * as _ from 'lodash';
import { MainPageData } from '../../classes/main-page-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  posts: Promise<{}>;
  dataObservable: Observable<any>;
  dataPromise: Promise<any>;
  dataPromise2: Promise<any>;
  dataPromise3: Promise<any>;
  dataPromise4: Promise<any>;
  subscription: Subscription;
  dataObservabe2: any;
  dataObservabe3: Observable<any>;
  backgroundImage;
  currentListShortId: string;

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) {

  }

  testFunc(): Promise<any> {
    return this.dynamicContentService
    .getTestDataWithPromise(ZenkitCollections.current.shortId)
    .then((response) => {
      return new Promise((resolve, reject) => {
        const test = response;
        return resolve(test);
      });
    });
  }

  testFunction(): Promise<any> {
    return this.dynamicContentService
    .fetchZenkitListData(ZenkitCollections.current.shortId)
    .then((response) => {
      return new Promise((resolve, reject) => {
        const test = _.get(response, ['elements']);
        const ttest = response;
        return resolve(ttest);
      });
    });
  }

  ngOnInit() {
    this.currentListShortId = ZenkitCollections.current.shortId;

    this.dataPromise2 = this.testFunc();

    this.dataPromise3 = this.testFunction();

    this.dataPromise4 = this.dynamicContentService
    .fetchZenkitListData(ZenkitCollections.current.shortId);

    this.subscription = this.dynamicContentService.getTestDataWithObservable(ZenkitCollections.current.shortId).subscribe((res) => {
      this.dataObservabe2 = res;
    });

    this.dynamicContentService
    .fetchZenkitListData3(ZenkitCollections.current.shortId).subscribe((res) => {
      this.dataObservabe3 = res;
    });

    this.dataObservable = this.dynamicContentService.getTestData(ZenkitCollections.current.shortId);

    this.dataPromise = this.dynamicContentService.getTestDataWithPromise(ZenkitCollections.current.shortId);

    this.posts = this.modelService.getPosts();

    this.modelService.getMainPageSections().then((mainPageData: MainPageData) => {
      this.backgroundImage = _.get(mainPageData, ['blogSection', 'image']);
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
}
