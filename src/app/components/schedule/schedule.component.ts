import { LocationData } from './../../classes/location-data';
import { UtilityService } from './../../services/utility.service';
import { Appointment } from './../../classes/appointment';
import { Location } from './../../classes/location';
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

  @Input() locationInitials: string;
  @Input() courseShortId: string;
  courseAppointments: Appointment[];
  courseAppointmentsByDay: Array<Appointment[]>;
  dayTitles = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
  private sub: any;
  location: Location;

  constructor(
    private modelService: ModelService,
    private utilityService: UtilityService
  ) {  }

  ngOnInit() {
    const locationInitials = this.locationInitials;
    Promise.all([
      this.modelService.getCourseAppointments(),
      this.modelService.getLocationByInitials(locationInitials)
      ]).then((results: any) => {
        this.courseAppointments = results[0];
        this.location = results[1];

        // Filter appointments by location
        if (this.location) {
          this.courseAppointments = _.filter(this.courseAppointments, {
            'location': this.location
          });
        }

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

  convertStringToUrlId(string) {
    return this.utilityService.convertStringToUrlId(string);
  }
}
