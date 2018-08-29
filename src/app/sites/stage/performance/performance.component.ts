import { UtilityService } from './../../../services/utility.service';
import { ZenkitCollections } from './../../../shared/constants/zenkit-collections';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModelService } from '../../../services/model.service';
import { Performance } from '../../../classes/performance';
import * as _ from 'lodash';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  performancesListId: string = ZenkitCollections.performances.shortId;
  performance: Performance;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private modelService: ModelService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.modelService.setPageLoaded(false);
    this.sub = this.route.params.subscribe(params => {
      const performanceShortId = params['shortId']; // (+) converts string 'id' to a number
      this.modelService.getPerformanceByShortId(performanceShortId).then((performance) => {
        this.performance = performance;
        this.modelService.setPageLoaded(true);
      });
   });
  }

  getDateStringLong() {
    return this.utilityService.convertDateToStringLong(this.performance.date);
  }
}
