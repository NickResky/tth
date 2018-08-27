import { ActivatedRoute } from '@angular/router';
import { TeamService } from './../../../services/team.service';
import { MainPageData } from './../../../classes/main-page-data';
import { ModelService } from './../../../services/model.service';
import { ZenkitCollections } from './../../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../../services/dynamic-content.service';
import { Teacher } from './../../../classes/teacher';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

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
    private dynamicContentService: DynamicContentService,
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
    return this.dynamicContentService.getFileSrc(_.get(file, ['shortId']), this.teamListShortId);
  }

  getBackgroundStyle(image) {
    return {
      'background-image': 'url(' + this.getFileSrc(image) + ')'
    };
  }

}
