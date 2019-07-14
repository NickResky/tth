import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  showModalDialog = false;
  slideIndex = 1;
  listShortId = undefined;
  pictures = [
    {'source' : 'assets/stage/H34A0833.JPG', 'isVisible': false},
    {'source' : 'assets/stage/H34A1365.JPG', 'isVisible': false},
    {'source' : 'assets/stage/H34A1480.JPG', 'isVisible': false},
    {'source' : 'assets/stage/H34A3398.JPG', 'isVisible': false},
    {'source' : 'assets/stage/H34A3586.jpg', 'isVisible': false},
    {'source' : 'assets/stage/H34A3738.JPG', 'isVisible': false}
  ];

  constructor() { }

  ngOnInit() {
    this.showSlides(1);
  }

  // in dynamischer Version kann hier die Liste mit Bildern übergeben werden. Hoffentlich :D
  show(images, listShortId) {
    this.listShortId = listShortId;
    this.pictures = _.map(images, (image) => {
      return {
        'source': this.getFileSrc(image),
        'isVisible': false
      };
    });
    this.showSlides(1);
    this.showModalDialog = true;
  }

  close() {
    this.showModalDialog = false;
  }

  showSlides(slideNumber: number) {
    let i;
    if (slideNumber > this.pictures.length) {
      this.slideIndex = 1;
    }
    if (slideNumber < 1) {
      this.slideIndex = this.pictures.length;
    }
    for (i = 0; i < this.pictures.length; i++) {
      this.pictures[i].isVisible = false;
    }
    // for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    // }
    this.pictures[this.slideIndex - 1].isVisible = true;
    // dots[this.slideIndex - 1].className += " active";
  }

  plusSlides(slideNumber: number) {
    this.showSlides(this.slideIndex += slideNumber);
  }

  currentSlide(slideNumber: number) {
    this.showSlides(this.slideIndex = slideNumber);
  }
  getFileSrc(file) {
    return UtilityService.getFileSrc(file.shortId, this.listShortId);
  }

}
