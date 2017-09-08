import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="navbar">
    <div class="contactContainer">
      <div class="badge"></div>
      <p>Maulbronnerweg 37, 71706 Markgröningen</p>
      <p>Liebigstraße 11, 71636 Ludwigsburg</p>
      <p>Tel. 07141 4873482</p>
      <p>anita@tanztheater-hanke.de</p>
    </div>
    <div class="container">
      <div>Impressum</div>
      <div>Copyright c by Tanztheater Anita Hanke 2017</div>
      <div>Designed by Niko Reschke and Yasmin Hollenbenders</div>
    </div>
    <div class="container">
      <div>Facebook</div>
      <div>YouTube</div>
    </div>
  </div>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}