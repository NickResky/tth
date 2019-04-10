import { Component, OnInit } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMobileNavOpen = false;
  pageLoaded;
  pageInitiallyLoaded;
  pageIsHome;
  isBrowser;
  scrolledToTop = true;

  constructor(
    private modelService: ModelService,
    private router: Router
  ) { }

  ngOnInit() {

    this.isBrowser = this.modelService.isPlatformBrowser();
    if (this.isBrowser) {
      this.pageLoaded = false;
      this.pageInitiallyLoaded = false;
    } else {
      this.pageLoaded = true;
      this.pageInitiallyLoaded = true;
    }

    this.modelService.isPageLoaded().subscribe(
      (x) => {
        if (this.modelService.isPlatformBrowser()) {
          this.pageLoaded = x;
          if (x && !this.pageInitiallyLoaded) {
            this.pageInitiallyLoaded = true;
          }
        }
      }
    );

    this.router.events.subscribe((evt: any) => {
      this.pageIsHome = evt.url === '/';
    });

    if (this.modelService.isPlatformBrowser()) {
      window.addEventListener('scroll', function(e) {
        const last_known_scroll_position = window.scrollY;
        this.scrolledToTop = last_known_scroll_position === 0;
      }.bind(this));
    }
  }

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  closeMobileNav() {
    this.isMobileNavOpen = false;
  }

}
