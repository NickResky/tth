import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModelService } from "../../services/model.service";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.scss"],
})
export class HeaderComponent implements OnInit {
  isMobileNavOpen = false;
  pageLoaded;
  pageInitiallyLoaded;
  pageIsHome;
  isBrowser;

  sections = [
    {
      title: "Rücken-Fit",
      id: "section01",
    },
    {
      title: "Nordic Walking",
      id: "section02",
    },
    {
      title: "Ernährungsberatung",
      id: "section03",
    },
  ];

  constructor(private modelService: ModelService, private router: Router) {}

  ngOnInit() {
    this.isBrowser = this.modelService.isPlatformBrowser();
    if (this.isBrowser) {
      this.pageLoaded = false;
      this.pageInitiallyLoaded = false;
    } else {
      this.pageLoaded = true;
      this.pageInitiallyLoaded = true;
    }

    this.modelService.isPageLoaded().subscribe((x) => {
      if (this.modelService.isPlatformBrowser()) {
        this.pageLoaded = x;
        if (x && !this.pageInitiallyLoaded) {
          this.pageInitiallyLoaded = true;
        }
      }
    });

    this.router.events.subscribe((evt: any) => {
      this.pageIsHome = evt.url === "/";
    });
  }

  toggleMobileNav() {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  closeMobileNav() {
    this.isMobileNavOpen = false;
  }

  goTo(sectionId: string) {
    this.closeMobileNav();

    var element = document.getElementById(sectionId);

    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}
