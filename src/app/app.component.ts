import { ModelService } from './services/model.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

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

  constructor(
        private router: Router,
        private modelService: ModelService
    ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
    });

    this.modelService.isPageLoaded().subscribe(
        (x) => {
            this.pageLoaded = x;
            setTimeout(() => {
                this.removeOverlay = x;
            }, 300);
        }
    );
  }
}
