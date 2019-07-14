import { CourseInformation } from './../../classes/course-information';
import { MainPageData } from './../../classes/main-page-data';
import { CourseData } from './../../classes/course-data';
import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';
import { UtilityService } from 'webapps-reschke-common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  backgroundImage;
  text;
  scheduleMG;
  scheduleLB;
  coursesListShortId = ZenkitCollections.courses.shortId;

  constructor(
    private modelService: ModelService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.modelService.getCourses().then((coursesData: CourseData) => {
      this.text = coursesData.text;
      this.scheduleMG = coursesData.scheduleMG;
      this.scheduleLB = coursesData.scheduleLB;
    });
    this.modelService.getMainPageSections().then((mainPageData: MainPageData) => {
      this.backgroundImage = _.get(mainPageData, ['coursesSection', 'image']);
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
}
