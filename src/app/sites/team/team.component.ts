import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { TeamService } from '../../services/team.service';
import { UtilityService, MainPageData, Teacher } from 'webapps-reschke-common';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  backgroundImage;
  teachers: Teacher[];
  showModalDialog = false;
  teamListShortId = ZenkitCollections.team.shortId;
  mainPageListShortId = ZenkitCollections.home.shortId;


  constructor(
    private modelService: ModelService,
    private teamService: TeamService
  ) { }

  ngOnInit() {
    this.modelService.setPageLoaded(false);

    Promise.all([this.modelService.getTeam(), this.modelService.getMainPageSections()]).then((results: any) => {
      this.teachers = results[0];
      this.backgroundImage = _.get(results[1], ['teamSection', 'image']);
      this.modelService.setPageLoaded(true);
    });
  }

  getTeacherUrlId(teacher) {
    const urlId = this.teamService.convertTeacherToUrlId(teacher);
    return urlId;
  }

  getFileSrc(file) {
    return UtilityService.getFileSrc(_.get(file, ['shortId']), this.teamListShortId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }

}
