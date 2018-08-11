import { Appointment } from './../../classes/appointment';
import { ModelService } from './../../services/model.service';
import { DynamicContentService } from './../../services/dynamic-content.service';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() course;
  courseAppointments: Appointment[];

  constructor(
    private modelService: ModelService) {  }

  ngOnInit() {
    this.modelService.getCourseAppointments().then((courseAppointments: Appointment[]) => {
      this.courseAppointments = courseAppointments;
    });
  }
}
