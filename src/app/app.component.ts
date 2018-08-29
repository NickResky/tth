import { ModelService } from './services/model.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {SeoService} from "./services/seo.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'app';
  pageLoaded = true;
  removeOverlay = true;

  constructor(private router: Router,
              private seoService: SeoService,
              private modelService: ModelService) {
    seoService.addSeoData();
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
    });

    this.modelService.isPageLoaded().subscribe(
        (x) => {
            setTimeout(() => {
                this.pageLoaded = x;
                this.removeOverlay = x;
            }, 300);
        }
    );
  }
}
