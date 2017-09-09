import { POSTS } from './../../../resources/mock-data/blog-data';
import { BlogPost } from './../../classes/blog-post';
import { Injectable } from '@angular/core';

@Injectable()
export class CurrentService {

  constructor() { }

  getPosts(): BlogPost[] {
    return POSTS;
  }

}
