import { MainPageData } from './../../classes/main-page-data';
import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { Performance } from './../../classes/performance';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { UtilityService } from 'webapps-reschke-common';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  backgroundImage;
  performances: Performance[];
  showModalDialog = false;
  performancesListShortId = ZenkitCollections.performances.shortId;

  constructor(
    private modelService: ModelService
  ) { }

  ngOnInit() {
    this.modelService.setPageLoaded(false);
    Promise.all([this.modelService.getPerformances(), this.modelService.getMainPageSections()]).then((results: any) => {
      this.performances = results[0];
      this.backgroundImage = _.get(results[1], ['performancesSection', 'image']);
      this.modelService.setPageLoaded(true);
    });
  }

  getFileSrc(file) {
    return UtilityService.getFileSrc(_.get(file, ['shortId']), this.performancesListShortId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }

}
