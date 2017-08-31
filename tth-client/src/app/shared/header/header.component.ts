import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <div class="navbar">
    <div class="logo"></div>
    <a href="#contact">Kontakt</a>
    <a href="#locations">Standorte</a>
    <a href="#team">Team</a>
    <a href="#courses">Kurse</a>
    <a href="#stage">Bühne</a>
    <a href="#current">Aktuelles</a>
  </div>
  `,
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
