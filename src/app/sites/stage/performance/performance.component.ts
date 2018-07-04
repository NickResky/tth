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

  performanceId: number;
  performancesListId: string = ZenkitCollections.performances.shortId;
  performance: Performance;
  private sub: any;

  constructor(private route: ActivatedRoute, private modelService: ModelService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.performanceId = +params['id']; // (+) converts string 'id' to a number
      this.modelService.getPerformances().then((performances: Performance[]) => {
        this.performance = performances[this.performanceId];
      });
   });
  }

  getDateString() {
    if (_.isNil(this.performance.date)) {
      return undefined;
    }
    const date = this.performance.date.getDate().toString() + '.'
      + (this.performance.date.getMonth() + 1).toString() + '.'
      + this.performance.date.getFullYear();
    return date;
  }
}
