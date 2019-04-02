import { Observable } from 'rxjs/Observable';
import { ScheduleData } from './../classes/schedule-data';
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
import { ScheduleService } from './schedule.service';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import * as _ from 'lodash';
import { Imprint } from './../classes/imprint';
import { ImprintService } from './imprint.service';
import { CourseInformation } from '../classes/course-information';
import { Appointment } from '../classes/appointment';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';


@Injectable()
export class ModelService {

    mainPageData: Promise<MainPageData>;
    contactData: Promise<Contact>;
    blogPostsData: Promise<BlogPost[]>;
    coursesData: Promise<CourseData>;
    performancesData: Promise<Performance[]>;
    teamData: Promise<Teacher[]>;
    locationData: Promise<LocationData>;
    imprintData: Promise<Imprint[]>;
    scheduleData: Promise<ScheduleData>;
    pageLoaded = new BehaviorSubject<boolean>(false);

    // pageLoaded = Observable.create(observer => {
    //     observer.onNext(false);
    //     observer.onCompleted();
    //     return observer;
    // });

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private mainPageService: MainPageService,
        private stageService: StageService,
        private coursesService: CoursesService,
        private teamService: TeamService,
        private locationsService: LocationsService,
        private contactService: ContactService,
        private currentService: CurrentService,
        private imprintService: ImprintService,
        private scheduleService: ScheduleService
    ) { }

    isPlatformBrowser() {
        return isPlatformBrowser(this.platformId);
    }

    isPageLoaded() {
        return this.pageLoaded;
    }

    setPageLoaded(value) {
        this.pageLoaded.next(value);
        return value;
    }

    getMainPageSections(): Promise<MainPageData> {
        if (_.isNil(this.mainPageData)) {
            this.mainPageData = this.mainPageService.getMainPageSections();
            return this.mainPageData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.mainPageData);
        });
    }

    getPosts(): Promise<BlogPost[]> {
        if (_.isNil(this.blogPostsData)) {
            this.blogPostsData = this.currentService.getPosts();
        }
        return this.blogPostsData;
    }

    getPostByShortId(shortId: string): Promise<BlogPost> {
        return this.getPosts().then((posts) => {
            const post = _.find(posts, (p: BlogPost) => {
                return p.shortId === shortId;
            });
            return post;
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

    getPerformanceByShortId(shortId: string) {
        return this.getPerformances().then((performances) => {
            const performance = _.find(performances, (p: Performance) => {
                return p.shortId === shortId;
            });
            return performance;
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

    getScheduleData() {
        if (_.isNil(this.scheduleData)) {
            return Promise.all([this.getCourses(), this.getTeam(), this.getLocationData()]).then((result: any) => {
                const courses: CourseInformation[] = _.get(result[0], ['courses']);
                const teachers: Teacher[] = result[1];
                const locationData: LocationData = result[2];
                this.scheduleData = this.scheduleService.getScheduleData(courses, teachers, locationData);
                return this.scheduleData;
            });
        }
        return new Promise((resolve, reject) => {
            return resolve(this.scheduleData);
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

    getTeacherByUrlId(urlId) {
        return this.getTeam().then((team) => {
            const teacher = _.find(team, (t: Teacher) => {
                const teacherUrlId = this.teamService.convertTeacherToUrlId(t);
                return teacherUrlId === urlId;
            });
            return teacher;
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

    getLocationByInitials(initials) {
        return this.getLocationData().then((locationData: LocationData) => {
            if (initials === 'MG') {
                return locationData.locationMG;
            } else if (initials === 'LB') {
                return locationData.locationLB;
            }
            return undefined;
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

    getEntries() {
        if (_.isNil(this.imprintData)) {
            this.imprintData = this.imprintService.getEntries();
            return this.imprintData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.imprintData);
        });
    }
}
