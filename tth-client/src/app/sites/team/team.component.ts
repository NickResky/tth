import { TeamService } from './team.service';
import { Teacher } from './../../classes/teacher';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  // private picture = require("resources/team/Anita.jpg");
  team: Teacher[];

  constructor(private teamService: TeamService) { }

  ngOnInit() {
    this.team = this.teamService.getTeam();
  }

}
