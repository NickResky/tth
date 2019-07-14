import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { CourseData } from '../classes/course-data';
import { CourseInformation } from '../classes/course-information';
import { UtilityService } from './utility.service';
import * as wrc from 'webapps-reschke-common';

@Injectable()
export class CoursesService {

    constructor() { }

  getCourses() {
    const listShortId = ZenkitCollections.courses.shortId;
    return wrc.getZenkitListData({
        listShortId: listShortId,
        requiredElements: UtilityService.getRequiredElementsByList(listShortId)
      }).then((zenkitListData) => {
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
