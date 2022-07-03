import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sb-main-page-header",
  templateUrl: "./sb-main-page-header.component.html",
  styleUrls: ["./sb-main-page-header.component.scss"],
})
export class SbMainPageHeaderComponent implements OnInit {
  sections = [
    {
      title: "Rücken-Fit",
      imageClass: "img1",
      id: "section01",
    },
    {
      title: "Nordic-Walking",
      imageClass: "img2",
      id: "section02",
    },
    {
      title: "Ernährungs-Beratung",
      imageClass: "img3",
      id: "section03",
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  goTo(sectionId: string) {
    var element = document.getElementById(sectionId);

    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}
