import { DynamicContentService } from './../../services/dynamic-content.service';
import { Component, OnInit, Input } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-header-image',
  templateUrl: './header-image.component.html',
  styleUrls: ['./header-image.component.scss']
})
export class HeaderImageComponent implements OnInit {

  @Input() image;
  @Input() listId;
  @Input() title;

  constructor(private dynamicContentService: DynamicContentService) { }

  ngOnInit() {

  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.listId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }

}
