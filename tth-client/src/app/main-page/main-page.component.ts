import { Component, OnInit } from '@angular/core';

import { SiteService } from './site.service';
import { Site } from './../classes/site';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  sites: Site[];

  constructor(private siteService: SiteService) { }

  ngOnInit() {
    this.sites = this.siteService.getSites();
  }

}
