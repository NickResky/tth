import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { Performance } from './../../classes/performance';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  performances: Performance[];
  showModalDialog = false;
  performancesListShortId = undefined;

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) { }

  ngOnInit() {
    this.performancesListShortId = ZenkitCollections.performances.shortId;

    this.modelService.getPerformances().then((performances: Performance[]) => {
      this.performances = performances;
    });
  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(file.shortId, this.performancesListShortId);
  }

}
