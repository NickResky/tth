import { UtilityService, CourseData, CourseInformation, ModelService } from 'webapps-reschke-common';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.scss']
})
export class CoursesOverviewComponent implements OnInit {

  courses: CourseInformation[];
  coursesListShortId: string = ZenkitCollections.courses.shortId;
  activeImageContainer;

  constructor(
    private modelService: ModelService,
  ) { }

    ngOnInit() {
      this.modelService.setPageLoaded(false);
      this.modelService.getCourses().then((coursesData: CourseData) => {
        this.courses = coursesData.courses;
        this.modelService.setPageLoaded(true);
      });
    }

    getFileSrc(file) {
      return UtilityService.getFileSrc(_.get(file, ['shortId']), this.coursesListShortId);
    }

    getBackgroundStyle(image) {
      return {
        'background-image': 'url(' + this.getFileSrc(image) + ')'
      };
    }

    mouseEnter(course) {
      const index = _.indexOf(this.courses, course);
      const imageContainerElements = document.getElementsByClassName('courses-overview-bg-image-container');
      this.activeImageContainer = imageContainerElements[index];
      this.activeImageContainer.classList.add('active');
    }

    mouseLeave(course) {
      this.activeImageContainer.classList.remove('active');
    }

    convertStringToUrlId(string) {
      return UtilityService.convertStringToUrlId(string);
    }
}
