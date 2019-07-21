import { ActivatedRoute } from '@angular/router';
import { TeamService } from './../../../services/team.service';
import { ZenkitCollections } from './../../../shared/constants/zenkit-collections';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { UtilityService, MainPageData, Teacher, ModelService } from 'webapps-reschke-common';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {

  teacher: Teacher;
  teamListShortId = ZenkitCollections.team.shortId;
  private sub: any;

  constructor(
    private modelService: ModelService,
    private teamService: TeamService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    this.modelService.setPageLoaded(false);
    this.sub = this.route.params.subscribe(params => {
      const teacherUrlId = params['id'];
      this.modelService.getTeacherByUrlId(teacherUrlId).then((teacher: Teacher) => {
        this.teacher = teacher;
        this.modelService.setPageLoaded(true);
      });
    });
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
