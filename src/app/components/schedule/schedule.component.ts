import { ScheduleData } from './../../classes/schedule-data';
import { LocationData } from './../../classes/location-data';
import { UtilityService } from './../../services/utility.service';
import { Appointment } from './../../classes/appointment';
import { Location } from './../../classes/location';
import { ModelService } from './../../services/model.service';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() locationInitials: string;
  @Input() courseShortId: string;
  courseAppointments: Appointment[];
  courseAppointmentsAll: Appointment[];
  courseAppointmentsByDay: Array<Appointment[]>;
  courseAppointmentsByDayAll: Array<Appointment[]>;
  dayTitles = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
  private sub: any;
  location: Location;
  levels: any[];
  ageGroups: any[];

  constructor(
    private modelService: ModelService,
    private utilityService: UtilityService
  ) {  }

  ngOnInit() {
    Promise.all([
      this.modelService.getScheduleData(),
      this.modelService.getLocationByInitials(this.locationInitials)
      ]).then((results: any) => {
        const scheduleData: ScheduleData = results[0];
        this.courseAppointments = scheduleData.appointments;
        this.location = results[1];

        this.ageGroups = _.map(scheduleData.ageGroupLabels, (ageGroupLabel) => {
          ageGroupLabel.isActive = true;
          return ageGroupLabel;
        });

        this.levels = _.map(scheduleData.levelLabels, (levelLabel) => {
          levelLabel.isActive = true;
          return levelLabel;
        });

        // Filter appointments by location
        if (this.location) {
          this.courseAppointments = _.filter(this.courseAppointments, {
            'location': this.location
          });
        }

        // Filter appointments by course category
        if (this.courseShortId) {
          this.courseAppointments = _.filter(this.courseAppointments, (appointment) => {
            return _.get(appointment, ['course', 'shortId']) === this.courseShortId;
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

        this.courseAppointmentsByDayAll = this.courseAppointmentsByDay;

        const activeLevels = _.filter(this.levels, (level) => {
          return level.isActive === true;
        });
        const activeAgeGroups = _.filter(this.ageGroups, (ageGroup) => {
          return ageGroup.isActive === true;
        });

        if (activeAgeGroups.length !== this.ageGroups.length
          || activeLevels.length !== this.levels.length) {
          this.updateSchedule();
        }
    });
  }

  updateSchedule() {
    const activeAgeGroupsStrings = _.reduce(this.ageGroups, (results, ageGroup) => {
      if (ageGroup.isActive) {
        results.push(ageGroup.title);
      }
      return results;
    }, []);

    if (activeAgeGroupsStrings.length === this.ageGroups.length) {
      this.courseAppointmentsByDay = this.courseAppointmentsByDayAll;
    } else {
      this.courseAppointmentsByDay = _.map        (this.courseAppointmentsByDayAll, (day) => {
        return _.reduce(day, (results: Appointment[], appointment) => {
          if (_.isEmpty(appointment.ageGroups)) {
            // results.push(appointment);
          } else {
            const appointmentAgeGroupsStrings = _.map(appointment.ageGroups, (ageGroup) => {
              return ageGroup.title;
            });
            const intersection = _.intersection(activeAgeGroupsStrings, appointmentAgeGroupsStrings);
            if (_.isEmpty(intersection) === false) {
              results.push(appointment);

            }
          }
          return results;
        }, []);
      });
    }

    const activeLevelsStrings = _.reduce(this.levels, (results, level) => {
      if (level.isActive) {
        results.push(level.title);
      }
      return results;
    }, []);

    if (activeLevelsStrings.length !== this.levels.length) {
      this.courseAppointmentsByDay = _.map        (this.courseAppointmentsByDay, (day) => {
        return _.reduce(day, (results: Appointment[], appointment) => {
          if (_.isEmpty(appointment.levels)) {
            // results.push(appointment);
          } else {
            const appointmentLevelsStrings = _.map(appointment.levels, (level) => {
              return level.title;
            });
            const intersection = _.intersection(activeLevelsStrings, appointmentLevelsStrings);
            if (_.isEmpty(intersection) === false) {
              results.push(appointment);
            }
          }
          return results;
        }, []);
      });
    }
  }

  getDayTitle(index: number) {
    return this.dayTitles[index];
  }

  getTimeString(date: Date) {
    const minutes = date.getMinutes();
    let minutesString = minutes.toString();
    if (minutes < 10) {
      minutesString = minutesString + '0';
    }
    return date.getHours() + '.' + minutesString;
  }

  getCourseLink(appointment: Appointment) {
    if (appointment.course) {
      const courseShortId = _.get(appointment, ['course', 'shortId']);
      const courseTitle = _.get(appointment, ['course', 'title']);
      return '/kurse/' + courseShortId + '/' + this.convertStringToUrlId(courseTitle);
    }
    return undefined;
  }

  toggleAgeGroup(ageGroup) {
    const index = _.findIndex(this.ageGroups, {
      title: ageGroup.title
    });
    this.ageGroups[index].isActive = !this.ageGroups[index].isActive;
    this.updateSchedule();
  }

  toggleLevel(level) {
    const index = _.findIndex(this.levels, {
      title: level.title
    });
    this.levels[index].isActive = !this.levels[index].isActive;
    this.updateSchedule();
  }

  convertStringToUrlId(string) {
    return this.utilityService.convertStringToUrlId(string);
  }

  getAgeGroupDetails(ageGroup) {
    return _.find(this.ageGroups, (a) => {
      return a.title === ageGroup;
    });
  }

  getScheduleIconStyle(hexColor) {
    return {
      'border-color': hexColor,
      'color': hexColor,
    };
  }

  selectLevel(selectedLevelTitle) {
    if (_.isNil(selectedLevelTitle) || _.isEmpty(selectedLevelTitle)) {
      _.forEach(this.levels, (level) => {
        level.isActive = true;
      });
    } else {
      _.forEach(this.levels, (level) => {
        if (level.title === selectedLevelTitle) {
          level.isActive = true;
        } else {
          level.isActive = false;
        }
      });
    }
    this.updateSchedule();
  }

  selectAgeGroup(selectedAgeGroupTitle) {
    if (_.isNil(selectedAgeGroupTitle) || _.isEmpty(selectedAgeGroupTitle)) {
      _.forEach(this.ageGroups, (ageGroup) => {
        ageGroup.isActive = true;
      });
    } else {
      _.forEach(this.ageGroups, (ageGroup) => {
        if (ageGroup.title === selectedAgeGroupTitle) {
          ageGroup.isActive = true;
        } else {
          ageGroup.isActive = false;
        }
      });
    }
    this.updateSchedule();
  }
}