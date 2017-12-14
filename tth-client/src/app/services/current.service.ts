import { ZenkitCollections } from './../shared/constants/zenkit-collections';

import { Injectable } from '@angular/core';
import _ from 'lodash';
import { DynamicContentService } from './dynamic-content.service';
import { BlogPost } from '../classes/blog-post';

@Injectable()
export class CurrentService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getPosts() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.current.shortId)
      .then((modifiedEntries) => {
        const posts = _.map(modifiedEntries, (modifiedEntry) => {
          const blogPost = new BlogPost();
          blogPost.title = modifiedEntry.title;
          blogPost.description = modifiedEntry.description;
          blogPost.images = modifiedEntry.images;
          blogPost.embed = modifiedEntry.embed;
          blogPost.date = modifiedEntry.date;
          return blogPost;
        });
        return posts;
      });
  }

}
