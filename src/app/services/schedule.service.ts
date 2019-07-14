import { Location } from './../classes/location';
import { CourseInformation } from './../classes/course-information';
import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { Contact } from './../classes/contact';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Appointment } from '../classes/appointment';
import { Teacher } from '../classes/teacher';
import { LocationData } from '../classes/location-data';
import { ScheduleData } from '../classes/schedule-data';
import { UtilityService, ZenkitDataService } from 'webapps-reschke-common';

@Injectable()
export class ScheduleService {

  constructor() { }

  getScheduleData (courses: CourseInformation[], teachers: Teacher[], locationData: LocationData) {
    const listShortId = ZenkitCollections.schedule.shortId;
    return ZenkitDataService.getZenkitListData({
        listShortId: listShortId,
        requiredElements: UtilityService.getRequiredElementsByList(listShortId, ZenkitCollections)
      }).then((zenkitListData) => {
        const getAgeGroupDetails = (ageGroupString) => {
            let hexColor: string;
            let iconString: string;
            if (_.includes(ageGroupString, 'Kinder') || _.includes(ageGroupString, 'Kids')) {
                hexColor = '#fae596';
                iconString = 'K';
            } else if (_.includes(ageGroupString, 'Jugend')) {
                hexColor = '#3fb0ac';
                iconString = 'J';
            } else {
                hexColor = '#a8b6bf';
                iconString = 'E';
            }
            const ageGroupCategory = _.find(_.get(zenkitListData, ['prefefinedCategories', 'ageGroups']), {
                name: ageGroupString
            });
            hexColor = _.get(ageGroupCategory, ['colorHex']);
            return {
                title: ageGroupString,
                hexColor: hexColor,
                iconString: iconString
            };
        };

        const getLevelDetails = (levelString) => {
            let hexColor: string;
            let iconString: string;
            if (_.includes(levelString, 'Grund') || _.includes(levelString, 'Anf') || _.includes(levelString, 'Beg')) {
              hexColor = '#edd9c0';
              iconString = '1';
            } else if (_.includes(levelString, 'Mittel')) {
              hexColor = '#9ad3de';
              iconString = '2';
            } else {
              hexColor = '#b56969';
              iconString = '3';
            }
            const levelCategory = _.find(_.get(zenkitListData, ['prefefinedCategories', 'levels']), {
                name: levelString
            });
            hexColor = _.get(levelCategory, ['colorHex']);
            return {
              title: levelString,
              hexColor: hexColor,
              iconString: iconString
            };
        };

        const scheduleData = new ScheduleData();

        const ageGroupLabels = _.map(_.get(zenkitListData, ['prefefinedCategories', 'ageGroups']), (ageGroupLabel) => {
            return getAgeGroupDetails(_.get(ageGroupLabel, ['name']));
        });

        scheduleData.ageGroupLabels = ageGroupLabels;

        const levelLabels = _.map(_.get(zenkitListData, ['prefefinedCategories', 'levels']), (levelLabel) => {
            return getLevelDetails(_.get(levelLabel, ['name']));
        });

        scheduleData.levelLabels = levelLabels;

        const dayLabels = _.map(_.get(zenkitListData, ['prefefinedCategories', 'days']), (dayLabel) => {
            const labelName = _.get(dayLabel, ['name']);
            return {
                title: labelName
            };
        });

        scheduleData.dayLabels = dayLabels;

        const appointments: Appointment[] = _.reduce(zenkitListData.entries, (results: Appointment[], modifiedEntry) => {

            // Every appointments needs to have a day label and title
            if (!modifiedEntry.label || !modifiedEntry.title) {
                return results;
            }

            const appointment = new Appointment();
            appointment.uuid = modifiedEntry.uuid;
            appointment.title = modifiedEntry.title;
            appointment.timeStartHours = modifiedEntry.timeStartHours;
            appointment.dateStart = new Date(2018, 0, 0, modifiedEntry.timeStartHours, modifiedEntry.timeStartMinutes);
            appointment.dateEnd = new Date(2018, 0, 0, modifiedEntry.timeEndHours, modifiedEntry.timeEndMinutes);
            appointment.levels = modifiedEntry.levels;



            appointment.ageGroups = _
                .chain(modifiedEntry.ageGroups)
                .map((ageGroup) => {
                    return getAgeGroupDetails(ageGroup);
                })
                // .orderBy(['index'])
                .value();

            appointment.levels = _
                .chain(modifiedEntry.levels)
                .map((level) => {
                  return getLevelDetails(level);
                })
                // .orderBy('index')
                .value();

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

            if (modifiedEntry.days && _.head(modifiedEntry.days)) {
                appointment.dayIndex = _.findIndex(_.get(zenkitListData, ['prefefinedCategories', 'days']), (day: any) => {
                    return day.name === _.head(modifiedEntry.days);
                });
            }
            results.push(appointment);
            return results;
        }, []);
        scheduleData.appointments = appointments;
        return scheduleData;
      });
  }

}
