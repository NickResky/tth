import { ActivatedRoute } from '@angular/router';
import { MainPageData } from './../../../classes/main-page-data';
import { CourseData } from './../../../classes/course-data';
import { DynamicContentService } from './../../../services/dynamic-content.service';
import { ModelService } from './../../../services/model.service';
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';
import { ZenkitCollections } from '../../../shared/constants/zenkit-collections';
import { CourseInformation } from '../../../classes/course-information';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  backgroundImage;
  coursesListShortId = ZenkitCollections.courses.shortId;
  courseId: number;
  course: CourseInformation;
  private sub: any;

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService, private route: ActivatedRoute) { }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.courseId = +params['id'];
        this.modelService.getCourses().then((coursesData: CourseData) => {
          this.course = coursesData.courses[this.courseId];
        });
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
