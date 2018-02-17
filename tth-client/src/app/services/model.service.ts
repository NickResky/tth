import { CurrentService } from './current.service';
import { ContactService } from './contact.service';
import { LocationsService } from './locations.service';
import { LocationData } from './../classes/location-data';
import { TeamService } from './team.service';
import { CourseData } from './../classes/course-data';
import { CoursesService } from './courses.service';
import { Performance } from './../classes/performance';
import { StageService } from './stage.service';
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
    locationData: Promise<LocationData>;

    constructor(
        private mainPageService: MainPageService,
        private stageService: StageService,
        private coursesService: CoursesService,
        private teamService: TeamService,
        private locationsService: LocationsService,
        private contactService: ContactService,
        private currentService: CurrentService
    ) { }

    getMainPageSections(): Promise<MainPageData> {
        if (_.isNil(this.mainPageData)) {
            this.mainPageData = this.mainPageService.getMainPageSections();
            return this.mainPageData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.mainPageData);
        });
    }

    getPosts() {
        if (_.isNil(this.blogPostsData)) {
            this.blogPostsData = this.currentService.getPosts();
            return this.blogPostsData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.blogPostsData);
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

    getTeam() {
        if (_.isNil(this.teamData)) {
            this.teamData = this.teamService.getTeam();
            return this.teamData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.teamData);
        });
    }

    getLocationData() {
        if (_.isNil(this.locationData)) {
            this.locationData = this.locationsService.getLocationData();
            return this.locationData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.locationData);
        });
    }

    getContact() {
        if (_.isNil(this.contactData)) {
            this.contactData = this.contactService.getContact();
            return this.contactData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.contactData);
        });
    }
}
