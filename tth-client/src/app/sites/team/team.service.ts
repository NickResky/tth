import { TEAM } from './../../../resources/mock-data/team-data';
import { Teacher } from './../../classes/teacher';
import { Injectable } from '@angular/core';

@Injectable()
export class TeamService {

  constructor() { }

  getTeam(): Teacher[] {
    return TEAM;
  }

}
