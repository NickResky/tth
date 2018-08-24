import { DynamicContentService } from './../../services/dynamic-content.service';
import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-cookies-notification',
  templateUrl: './cookies-notification.component.html',
  styleUrls: ['./cookies-notification.component.scss']
})
export class CookiesNotificationComponent implements OnInit {

  displayCookiesNotification = false;

  constructor() { }

  ngOnInit() {
    const cookiesAcceptedStoredValue = localStorage.getItem('tth-cookies-accepted');
    if (_.isNil(cookiesAcceptedStoredValue)) {
      this.displayCookiesNotification = true;
    }
  }

  acceptCookies() {
    this.displayCookiesNotification = false;
    localStorage.setItem('tth-cookies-accepted', 'true');
  }
}
