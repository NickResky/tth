import { CourseData } from './../classes/course-data';
import { CoursesService } from './courses.service';
import { Performance } from './../classes/performance';
import { StageService } from './stage.service';
import { Location } from './../classes/location';
import { Teacher } from './../classes/teacher';
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
    coursesData: Promise<CourseData>;
    performancesData: Promise<Performance[]>;
    teamData: Promise<Teacher[]>;
    locationData: Promise<Location[]>;

    constructor(
        private mainPageService: MainPageService,
        private stageService: StageService,
        private coursesService: CoursesService,
    ) { }

    getMainPageSections() {
        if (_.isNil(this.mainPageData)) {
            this.mainPageData = this.mainPageService.getMainPageSections();
            return this.mainPageData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.mainPageData);
        });
    }

    getPerformances() {
        if (_.isNil(this.performancesData)) {
            this.performancesData = this.stageService.getPerformances();
            return this.performancesData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.performancesData);
        });
    }

    getCourses() {
        if (_.isNil(this.coursesData)) {
            this.coursesData = this.coursesService.getCourses();
            return this.coursesData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.coursesData);
        });
    }
}
