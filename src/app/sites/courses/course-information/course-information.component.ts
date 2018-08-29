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
  scheduleMG;
  scheduleLB;
  coursesListShortId = ZenkitCollections.courses.shortId;
  registrationChild;
  registrationAdult;

  constructor(private modelService: ModelService,
              private dynamicContentService: DynamicContentService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.fragment.subscribe();

    this.modelService.getCourses().then((coursesData: CourseData) => {
      this.text = coursesData.text;
      this.scheduleMG = coursesData.scheduleMG;
      this.scheduleLB = coursesData.scheduleLB;
      this.registrationChild = this.getFileSrc(coursesData.registrationChild);
      this.registrationAdult = this.getFileSrc(coursesData.registrationAdult);
    });
    this.modelService.getMainPageSections().then((mainPageData: MainPageData) => {
      this.backgroundImage = _.get(mainPageData, ['coursesSection', 'image']);
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
