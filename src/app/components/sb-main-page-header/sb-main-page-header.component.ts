import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sb-main-page-header',
  templateUrl: './sb-main-page-header.component.html',
  styleUrls: ['./sb-main-page-header.component.scss']
})
export class SbMainPageHeaderComponent implements OnInit {

  sections = [{
    title: "Rückengymnastik",
    imageClass: "img1"
  }, {
    title: "Nordic Walking",
    imageClass: "img2"
  }, {
    title: "Ernährungsberatung",
    imageClass: "img3"
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
