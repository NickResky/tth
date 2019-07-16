import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BlogPost } from 'webapps-reschke-common';
import { UtilityService, ZenkitDataService} from 'webapps-reschke-common';

@Injectable()
export class CurrentService {

  constructor() { }

  getPosts(): Promise<BlogPost[]> {
    return new Promise((resolve, reject) => {
      const listShortId = ZenkitCollections.current.shortId;
      return ZenkitDataService.getZenkitListData({
        listShortId: listShortId,
        requiredElements: UtilityService.getRequiredElementsByList(listShortId, ZenkitCollections)
      }).then((zenkitListData) => {
          let posts: BlogPost[] = _.map(zenkitListData.entries, (modifiedEntry) => {
            const blogPost = new BlogPost();
            blogPost.shortId = modifiedEntry.shortId;
            blogPost.title = modifiedEntry.title;
            blogPost.description = modifiedEntry.description;
            blogPost.images = modifiedEntry.images;
            blogPost.youtubeVideoId = modifiedEntry.youtubeVideoId;
            blogPost.date = modifiedEntry.date;
            if (_.isNil(modifiedEntry.date) === false) {
              blogPost.date = new Date(modifiedEntry.date);
            }
            if (blogPost.title && blogPost.date) {
              const dateString = UtilityService.convertDateToString(blogPost.date);
              blogPost.routerLink =
                '/blog/' +
                blogPost.shortId +
                '/' +
                UtilityService.convertStringToUrlId(blogPost.title) +
                '/' +
                UtilityService.convertStringToUrlId(dateString);
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
