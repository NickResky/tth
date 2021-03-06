import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { UtilityService, MainPageData, Teacher, ModelService } from 'webapps-reschke-common';

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
    private modelService: ModelService
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
    const urlId = UtilityService.convertTeacherToUrlName(teacher);
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
