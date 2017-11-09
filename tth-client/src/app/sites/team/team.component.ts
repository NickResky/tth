import { ModelService } from './../../services/model.service';
import { ZenkitCollections } from './../../shared/constants/zenkit-collections';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { Teacher } from './../../classes/teacher';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  teachers: Teacher[];
  showModalDialog = false;
  performancesListShortId = undefined;

  constructor(private modelService: ModelService, private dynamicContentService: DynamicContentService) { }

  ngOnInit() {
    this.performancesListShortId = ZenkitCollections.team.shortId;

    this.modelService.getTeam().then((teachers: Teacher[]) => {
      this.teachers = teachers;
    });
  }

  getFileSrc(file) {
    return this.dynamicContentService.getFileSrc(file.shortId, this.performancesListShortId);
  }

}
