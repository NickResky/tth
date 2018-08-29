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
      .then((zenkitListData) => {
            const pricesEntry: any = _.find(zenkitListData.entries, {
                label: 'Preise'
            });
            const scheduleMGEntry: any = _.find(zenkitListData.entries, {
                label: 'Stundenplan Markgroeningen'
            });
            const scheduleLBEntry: any = _.find(zenkitListData.entries, {
                label: 'Stundenplan Ludwigsburg'
            });
            const registrationChildEntry: any = _.find(zenkitListData.entries, {
                label: 'Anmeldung Kind'
            });
            const registrationAdultEntry: any = _.find(zenkitListData.entries, {
                label: 'Anmeldung Erwachsener'
            });

            const courseEntries: any = _.filter(zenkitListData.entries, {
                label: 'Kurs'
            });

            const courseData = new CourseData();
            courseData.text = pricesEntry.description;
            courseData.scheduleMG = _.head(scheduleMGEntry.file);
            courseData.scheduleLB = _.head(scheduleLBEntry.file);
            courseData.registrationChild = _.head(registrationChildEntry.file);
            courseData.registrationAdult = _.head(registrationAdultEntry.file);

            courseData.courses = _.map(courseEntries, (courseEntry) => {
                const course = new CourseInformation();
                course.uuid = courseEntry.uuid;
                course.shortId = courseEntry.shortId;
                course.title = courseEntry.title;
                course.description = courseEntry.description;
                course.image = _.head(courseEntry.image);
                course.youtubeId = courseEntry.youtubeId;
                return course;
            });

            return courseData;
      });
  }

}
