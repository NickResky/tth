import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
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

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) { }

  ngOnInit() {
    this.currentListShortId = ZenkitCollections.current.shortId;

    this.modelService.getPosts().then((posts) => {
      this.posts = posts;
    });
  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(file.shortId, this.currentListShortId);
  }
}
