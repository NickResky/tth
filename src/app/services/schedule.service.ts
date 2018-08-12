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

  dayIndices = ['montag', 'dienstag', 'mittwoch', 'donnerstag', 'freitag'];

  constructor(private dynamicContentService: DynamicContentService) { }

  getCourseAppointments (courses: CourseInformation[], teachers: Teacher[], locationData: LocationData) {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.schedule.shortId)
      .then((modifiedEntries) => {
        const appointments: Appointment[] = _.reduce(modifiedEntries, (results: Appointment[], modifiedEntry) => {

            if (!modifiedEntry.label || !modifiedEntry.title) {
                return results;
            }

            const appointment = new Appointment();
            appointment.uuid = modifiedEntry.uuid;
            appointment.title = modifiedEntry.title;
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

            if (modifiedEntry.label) {
                appointment.dayIndex = _.findIndex(this.dayIndices, (dayIndex) => {
                    return _.includes(modifiedEntry.label.toLowerCase(), dayIndex);
                });
            }
            results.push(appointment);
            return results;
        }, []);
        return appointments;
      });
  }

}
