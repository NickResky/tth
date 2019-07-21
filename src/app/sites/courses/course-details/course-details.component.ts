import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ZenkitCollections } from '../../../shared/constants/zenkit-collections';
import { DomSanitizer } from '@angular/platform-browser';
import { UtilityService, CourseData, CourseInformation, MainPageData, ModelService } from 'webapps-reschke-common';


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
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
  ) { }

    ngOnInit() {
      this.modelService.setPageLoaded(false);
      this.sub = this.route.params.subscribe(params => {
        this.courseShortId = params['shortId'];
        this.modelService.getCourses().then((coursesData: CourseData) => {
          this.course = _.find(coursesData.courses, (course) => {
            return course.shortId === this.courseShortId;
          });
          this.modelService.setPageLoaded(true);
        });
     });
    }

    getYoutubeLink() {
      const url = 'https://www.youtube.com/embed/'  + this.course.youtubeId + '?rel=0&amp;showinfo=0&amp;loop=1&amp;playlist=' + this.course.youtubeId;
      return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
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
