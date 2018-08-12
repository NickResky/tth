import { Location } from './../classes/location';
import { CourseInformation } from './../classes/course-information';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './../services/dynamic-content.service';
import { Contact } from './../classes/contact';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Appointment } from '../classes/appointment';
import { Teacher } from '../classes/teacher';
import { LocationData } from '../classes/location-data';

@Injectable()
export class ScheduleService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getCourseAppointments (courses: CourseInformation[], teachers: Teacher[], locationData: LocationData) {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.schedule.shortId)
      .then((modifiedEntries) => {
        const appointments: Appointment[] = _.map(modifiedEntries, (modifiedEntry) => {
            const appointment = new Appointment();
            appointment.uuid = modifiedEntry.uuid;
            appointment.timeStartHours = modifiedEntry.timeStartHours;
            appointment.dateStart = new Date(2018, 0, 0, modifiedEntry.timeStartHours, modifiedEntry.timeStartMinutes);
            appointment.dateEnd = new Date(2018, 0, 0, modifiedEntry.timeEndHours, modifiedEntry.timeEndMinutes);

            const courseUuid = _.head(modifiedEntry.course);
            appointment.course = _.find(courses, (course) => {
                return course.uuid === courseUuid;
            });

            const teacherUuid = _.head(modifiedEntry.teacher);
            appointment.teacher = _.find(teachers, (teacher) => {
                return teacher.uuid === teacherUuid;
            });


            const locationUuid = _.head(modifiedEntry.location);
            const locations = [locationData.locationMG, locationData.locationLB];
            appointment.location = _.find(locations, (location) => {
                return location.uuid === locationUuid;
            });

            return appointment;
        });
        return appointments;
      });
  }

}
