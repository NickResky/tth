import { MainPageData } from './../../classes/main-page-data';
import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { Teacher } from './../../classes/teacher';
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  backgroundImage;
  teachers: Teacher[];
  showModalDialog = false;
  teamListShortId = undefined;

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) { }

  ngOnInit() {
    this.teamListShortId = ZenkitCollections.team.shortId;

    this.modelService.getTeam().then((teachers: Teacher[]) => {
      this.teachers = teachers;
    });

    this.modelService.getMainPageSections().then((mainPageData: MainPageData) => {
      this.backgroundImage = _.get(mainPageData, ['teamSection', 'image']);
    });
  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.teamListShortId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }

}
