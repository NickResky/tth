import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { CurrentService } from './current.service';
import { BlogPost } from './../../classes/blog-post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  posts: BlogPost[];
  currentListShortId: {};

  constructor(private currentService: CurrentService, private dynamicContentService: DynamicContentService) { }

  ngOnInit() {
    this.currentListShortId = ZenkitCollections.current.shortId;

    this.currentService.getPosts().then((posts) => {
      this.posts = posts;
    });
  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(file.shortId, this.currentListShortId);
  }
}
