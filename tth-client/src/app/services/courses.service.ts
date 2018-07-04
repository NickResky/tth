import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './dynamic-content.service';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { CourseData } from '../classes/course-data';
import { CourseInformation } from '../classes/course-information';

@Injectable()
export class CoursesService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getCourses() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.courses.shortId)
      .then((modifiedEntries) => {
            const pricesEntry: any = _.find(modifiedEntries, {
                label: 'Preise'
            });
            const scheduleMGEntry: any = _.find(modifiedEntries, {
                label: 'Stundenplan Markgroeningen'
            });
            const scheduleLBEntry: any = _.find(modifiedEntries, {
                label: 'Stundenplan Ludwigsburg'
            });

            const courseEntries: any = _.filter(modifiedEntries, {
                label: 'Kurs'
            });

            const courseData = new CourseData();
            courseData.text = pricesEntry.description;
            courseData.scheduleMG = _.head(scheduleMGEntry.schedule);
            courseData.scheduleLB = _.head(scheduleLBEntry.schedule);

            courseData.courses = _.map(courseEntries, (courseEntry) => {
                const course = new CourseInformation();
                course.title = courseEntry.title;
                course.description = courseEntry.description;
                course.image = _.head(courseEntry.image);
                return course;
            });

            return courseData;
      });
  }

}
