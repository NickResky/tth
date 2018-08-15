import { UtilityService } from './../services/utility.service';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { CourseInformation } from './../classes/course-information';
import { CourseData } from './../classes/course-data';
import { ModelService } from './../services/model.service';
import { DynamicContentService } from './../services/dynamic-content.service';
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
    private dynamicContentService: DynamicContentService,
    private utilityService: UtilityService
  ) { }

    ngOnInit() {
      this.modelService.getCourses().then((coursesData: CourseData) => {
        this.courses = coursesData.courses;
      });
    }

    getFileSrc(file) {
      return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.coursesListShortId);
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
      return this.utilityService.convertStringToUrlId(string);
    }
}
