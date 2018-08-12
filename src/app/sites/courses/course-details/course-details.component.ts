import { ActivatedRoute } from '@angular/router';
import { MainPageData } from './../../../classes/main-page-data';
import { CourseData } from './../../../classes/course-data';
import { DynamicContentService } from './../../../services/dynamic-content.service';
import { ModelService } from './../../../services/model.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ZenkitCollections } from '../../../shared/constants/zenkit-collections';
import { CourseInformation } from '../../../classes/course-information';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  backgroundImage;
  coursesListShortId = ZenkitCollections.courses.shortId;
  courseShortId: string;
  course: CourseInformation;
  private sub: any;

  constructor(
    private modelService: ModelService,
    private dynamicContentService: DynamicContentService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) { }

    ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
        this.courseShortId = params['shortId'];
        this.modelService.getCourses().then((coursesData: CourseData) => {
          this.course = _.find(coursesData.courses, (course) => {
            return course.shortId === this.courseShortId;
          });
        });
     });
    }

    getYoutubeLink() {
      const url = 'https://www.youtube.com/embed/'  + this.course.youtubeId;
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
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
