import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './dynamic-content.service';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Teacher } from '../classes/teacher';
import { UtilityService } from './utility.service';


@Injectable()
export class TeamService {

  constructor(
    private dynamicContentService: DynamicContentService,
    private utilityService: UtilityService
  ) { }

  getTeam() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.team.shortId)
      .then((zenkitListData) => {
        const team = _.map(zenkitListData.entries, (modifiedEntry) => {
          const teacher = new Teacher();
          teacher.uuid = modifiedEntry.uuid;
          teacher.firstName = modifiedEntry.firstName;
          teacher.lastName = modifiedEntry.lastName;
          teacher.task = modifiedEntry.task;
          teacher.description = modifiedEntry.description;
          teacher.image = _.head(modifiedEntry.image);
          return teacher;
        });
        return team;
      });
  }

  convertTeacherToUrlId(teacher: Teacher) {
    const convertedFirstName = this.utilityService.convertStringToUrlId(teacher.firstName);
    const convertedLastName = this.utilityService.convertStringToUrlId(teacher.lastName);
    return convertedFirstName + '-' + convertedLastName;
  }
}
