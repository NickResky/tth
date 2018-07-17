import { MainPageData } from './../../classes/main-page-data';
import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { Performance } from './../../classes/performance';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

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

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) { }

  ngOnInit() {
    this.modelService.getPerformances().then((performances: Performance[]) => {
      this.performances = performances;
    });

    this.modelService.getMainPageSections().then((mainPageData: MainPageData) => {
      this.backgroundImage = _.get(mainPageData, ['performancesSection', 'image']);
    });
  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.performancesListShortId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }

}
