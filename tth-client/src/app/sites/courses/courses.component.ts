import { MainPageData } from './../../classes/main-page-data';
import { CourseData } from './../../classes/course-data';
import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  backgroundImage;
  text = undefined;
  scheduleMG = undefined;
  scheduleLB = undefined;
  coursesListShortId = ZenkitCollections.courses.shortId;

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) { }

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
    return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.coursesListShortId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }
}
