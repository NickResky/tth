import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-text-animation',
  templateUrl: './text-animation.component.html',
  styleUrls: ['./text-animation.component.scss']
})
export class TextAnimationComponent implements OnInit {

  @Input() animationDelayParam: string;
  @Input() animationDurationParam: string;
  @Input() textParam: string;
  text: string;
  animationDelay: string;
  animationDuration: string;

  constructor(private dynamicContentService: DynamicContentService, private router: Router) { }

  ngOnInit() {
    this.text = this.textParam;
    this.animationDelay = this.animationDelayParam;
    this.animationDuration = this.animationDurationParam;
  }

  getStyle() {
    return {
      'animation-duration': this.animationDuration,
      'animation-delay': this.animationDelay
    };
  }
}
