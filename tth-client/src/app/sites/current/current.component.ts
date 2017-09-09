import { CurrentService } from './current.service';
import { BlogPost } from './../../classes/blog-post';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  posts: BlogPost[]

  constructor(private currentService: CurrentService) { }

  ngOnInit() {
    this.posts = this.currentService.getPosts();
  }

}
