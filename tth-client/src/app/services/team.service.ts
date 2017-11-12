import { ZenkitCollections } from './../shared/constants/zenkit-collections';
import { DynamicContentService } from './dynamic-content.service';
import { Injectable } from '@angular/core';
import _ from 'lodash';
import { Teacher } from '../classes/teacher';

@Injectable()
export class TeamService {

  constructor(private dynamicContentService: DynamicContentService) { }

  getTeam() {
    return this.dynamicContentService
      .fetchAndTransformZenkitListData(ZenkitCollections.team.shortId)
      .then((modifiedEntries) => {
        const team = _.map(modifiedEntries, (modifiedEntry) => {
          const teacher = new Teacher();
          teacher.name = modifiedEntry.name;
          teacher.task = modifiedEntry.task;
          teacher.description = modifiedEntry.description;
          teacher.image = _.head(modifiedEntry.image);
          return teacher;
        });
        return team;
      });
  }

}