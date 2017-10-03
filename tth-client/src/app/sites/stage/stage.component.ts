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

  constructor() { }

  ngOnInit() {
  }

}
