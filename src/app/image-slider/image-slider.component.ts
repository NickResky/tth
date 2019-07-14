import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { UtilityService } from 'webapps-reschke-common';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit {

  @Input() images;
  @Input() listid;
  sliderImages: any;
  zenkitListId;
  currentImageIndex = 0;

  constructor() { }

  ngOnInit() {
    this.sliderImages = _.map(this.images, (image) => {
      image['isActive'] = false;
      return image;
    });
    const firstImage: any = _.head(this.sliderImages);
    firstImage.isActive = true;
    this.zenkitListId = this.listid;
  }

  getFileSrc(file) {
    return UtilityService.getFileSrc(_.get(file, ['shortId']), this.zenkitListId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }

  next() {
    this.images[this.currentImageIndex].isActive = false;
    this.currentImageIndex = (this.currentImageIndex + 1) % this.sliderImages.length;
    this.images[this.currentImageIndex].isActive = true;
  }

  prev() {
    this.images[this.currentImageIndex].isActive = false;
    this.currentImageIndex = this.currentImageIndex - 1;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.sliderImages.length - 1;
    }
    this.images[this.currentImageIndex].isActive = true;
  }
}
