import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './dynamic-content.service';
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { CourseData } from '../classes/course-data';

@Injectable()
export class CoursesService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getCourses() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.courses.shortId)
      .then((modifiedEntries) => {
            const pricesEntry = _.find(modifiedEntries, {
                label: 'Preise'
            });
            const scheduleMGEntry = _.find(modifiedEntries, {
                label: 'Stundenplan Markgröningen'
            });
            const scheduleLBEntry = _.find(modifiedEntries, {
                label: 'Stundenplan Ludwigsburg'
            });

            const courseData = new CourseData();
            courseData.text = pricesEntry.description;
            courseData.scheduleMG = _.head(scheduleMGEntry.schedule);
            courseData.scheduleLB = _.head(scheduleLBEntry.schedule);
            return courseData;
      });
  }

}
