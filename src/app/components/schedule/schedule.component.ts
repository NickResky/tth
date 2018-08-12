import { Appointment } from './../../classes/appointment';
import { ModelService } from './../../services/model.service';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() course;
  courseAppointments: Appointment[];
  courseAppointmentsByDay: Array<Appointment[]>;
  dayTitles = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  constructor(
    private modelService: ModelService) {  }

  ngOnInit() {
    this.modelService.getCourseAppointments().then((courseAppointments: Appointment[]) => {
      this.courseAppointments = courseAppointments;

      // Categorize appointments by day

      const sortedAppointments = [];
      for (let i = 0; i < 5; i++) {
        sortedAppointments[i] = [];
      }
      // tslint:disable-next-line:max-line-length
      this.courseAppointmentsByDay = _.reduce(this.courseAppointments, (sortedArray: any, appointment: Appointment) => {
        sortedArray[appointment.dayIndex].push(appointment);
        return sortedArray;
      }, sortedAppointments);

      // Sort appointments by time
      this.courseAppointmentsByDay = _.map(this.courseAppointmentsByDay, (appointmentArray: Appointment[]) => {
        return _.orderBy(appointmentArray, ['dateStart'], ['asc']);
      });
    });
  }

  getDayTitle(index: number) {
    return this.dayTitles[index];
  }

  getTimeString(date: Date) {
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = minutes * 10;
    }
    return date.getHours() + '.' + minutes;
  }
}
