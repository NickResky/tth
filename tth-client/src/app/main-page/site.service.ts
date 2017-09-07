import { Injectable } from '@angular/core';

import { Site } from './../classes/site';
import { SITES } from '../../resources/mock-data/site-data';

@Injectable()
export class SiteService {

  constructor() { }

  getSites(): Site[] {
    return SITES;
  }

}
