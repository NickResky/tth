import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { BlogPost } from './../../classes/blog-post';
import { Component, OnInit } from '@angular/core';
import { MainPageSection } from '../../classes/main-page-section';
import _ from 'lodash';
import { MainPageData } from '../../classes/main-page-data';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  posts: Observable<{}>;
  backgroundImage;
  currentListShortId: string;

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) { }

  ngOnInit() {
    this.currentListShortId = ZenkitCollections.current.shortId;

    //this.posts = Observable.fromPromise(this.modelService.getPosts());

    this.posts = Observable
    .of([
      {
        title: 'title',
        description: 'desc',
        images: null,
        embed: undefined,
        date: undefined
      },
    ])
    .delay(1000);

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
