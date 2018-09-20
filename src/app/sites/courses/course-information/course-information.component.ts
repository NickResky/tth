import { CourseInformation } from './../../../classes/course-information';
import { MainPageData } from './../../../classes/main-page-data';
import { CourseData } from './../../../classes/course-data';
import { ModelService } from './../../../services/model.service';
import { ZenkitCollections } from './../../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../../services/dynamic-content.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-course-information',
  templateUrl: './course-information.component.html',
  styleUrls: ['./course-information.component.scss']
})
export class CourseInformationComponent implements OnInit {

  backgroundImage;
  text;
  coursesListShortId = ZenkitCollections.courses.shortId;
  registrationChild;
  registrationAdult;
  scheduleMG;
  scheduleLB;

  constructor(private modelService: ModelService,
              private dynamicContentService: DynamicContentService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.modelService.setPageLoaded(false);

    Promise.all([
      this.modelService.getCourses(), this.modelService.getMainPageSections(),
      this.modelService.getScheduleData()
    ]).then((results: any) => {
      const courseData: CourseData = results[0];
      const mainPageData: MainPageData = results[1];

      this.text = courseData.text;
      this.registrationChild = this.getFileSrc(courseData.registrationChild);
      this.registrationAdult = this.getFileSrc(courseData.registrationAdult);
      this.scheduleMG = this.getFileSrc(courseData.scheduleMG);
      this.scheduleLB = this.getFileSrc(courseData.scheduleLB);

      this.backgroundImage = _.get(mainPageData, ['coursesSection', 'image']);
      this.modelService.setPageLoaded(true);
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
}
