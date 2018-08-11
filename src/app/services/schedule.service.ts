import { CourseInformation } from './../classes/course-information';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './../services/dynamic-content.service';
import { Contact } from './../classes/contact';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Appointment } from '../classes/appointment';

@Injectable()
export class ScheduleService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getCourseAppointments () {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.schedule.shortId)
      .then((modifiedEntries) => {
        const appointments: Appointment[] = _.map(modifiedEntries, (modifiedEntry) => {
            const appointment = new Appointment();
            appointment.timeStartHours = modifiedEntry.timeStartHours;
            appointment.course = modifiedEntry.course;
            return appointment;
        });
        return appointments;
      });
  }

}
