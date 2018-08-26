import { UtilityService } from './utility.service';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';

import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { DynamicContentService } from './dynamic-content.service';
import { BlogPost } from '../classes/blog-post';

@Injectable()
export class CurrentService {

  constructor(
    private dynamicContentService: DynamicContentService,
    private utilityService: UtilityService
  ) { }

  getPosts(): Promise<BlogPost[]> {
    return new Promise((resolve, reject) => {
      this.dynamicContentService
        .fetchAndTransformZenkitListData(ZenkitCollections.current.shortId)
        .then((zenkitListData) => {
          let posts: BlogPost[] = _.map(zenkitListData.entries, (modifiedEntry) => {
            const blogPost = new BlogPost();
            blogPost.shortId = modifiedEntry.shortId;
            blogPost.title = modifiedEntry.title;
            blogPost.description = modifiedEntry.description;
            blogPost.images = modifiedEntry.images;
            blogPost.embed = modifiedEntry.embed;
            blogPost.date = modifiedEntry.date;
            if (_.isNil(modifiedEntry.date) === false) {
              blogPost.date = new Date(modifiedEntry.date);
            }
            if (blogPost.title && blogPost.date) {
              const dateString = this.utilityService.convertDateToString(blogPost.date);
              blogPost.routerLink =
                '/blog/' +
                blogPost.shortId +
                '/' +
                this.utilityService.convertStringToUrlId(blogPost.title) +
                '/' +
                this.utilityService.convertStringToUrlId(dateString);
            } else {
              blogPost.routerLink = '/blog/' + blogPost.shortId;
            }
            return blogPost;
          });
          posts = posts.reverse(); // newest posts should be first
          return resolve(posts);
      });
    });
  }
}
