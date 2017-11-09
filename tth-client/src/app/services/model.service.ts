import { Location } from './../classes/location';
import { Teacher } from './../classes/teacher';
import { CourseInformation } from './../classes/course-information';
import { BlogPost } from './../classes/blog-post';
import { Contact } from './../classes/contact';
import { MainPageData } from './../classes/main-page-data';
import { MainPageSection } from './../classes/main-page-section';
import { MainPageService } from './main-page.service';
import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable()
export class ModelService {

    mainPageData: Promise<MainPageData>;
    contactData: Promise<Contact>;
    blogPostsData: Promise<BlogPost[]>;
    coursesData: Promise<CourseInformation[]>;
    teamData: Promise<Teacher[]>;
    locationData: Promise<Location[]>;

    constructor(private mainPageService: MainPageService ) { }

    getMainPageSections() {
        if (_.isNil(this.mainPageData)) {
            this.mainPageData = this.mainPageService.getMainPageSections();
            return this.mainPageData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.mainPageData);
        });
    }
}
