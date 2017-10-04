import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  showModalDialog = false;

  constructor() { }

  ngOnInit() {
  }

  show() {
    this.showModalDialog = true;
  }

  close() {
    this.showModalDialog = false;
  }

}
