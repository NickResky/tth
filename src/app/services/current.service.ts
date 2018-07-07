import { ZenkitCollections } from './../shared/constants/zenkit-collections';

import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { DynamicContentService } from './dynamic-content.service';
import { BlogPost } from '../classes/blog-post';

@Injectable()
export class CurrentService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getPosts(): Promise<BlogPost[]> {
    return new Promise((resolve, reject) => {
      this.dynamicContentService
        .fetchAndTransformZenkitListData(ZenkitCollections.current.shortId)
        .then((modifiedEntries) => {
          let posts: BlogPost[] = _.map(modifiedEntries, (modifiedEntry) => {
            const blogPost = new BlogPost();
            blogPost.title = modifiedEntry.title;
            blogPost.description = modifiedEntry.description;
            blogPost.images = modifiedEntry.images;
            blogPost.embed = modifiedEntry.embed;
            blogPost.date = modifiedEntry.date;
            return blogPost;
          });
          posts = posts.reverse(); // newest posts should be first
          return resolve(posts);
      });
    });
  }
}
