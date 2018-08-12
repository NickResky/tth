import { CourseInformation } from './../classes/course-information';
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
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Imprint } from './../classes/imprint';
import { ImprintService } from './imprint.service';
import { CourseInformation } from '../classes/course-information';
import { Appointment } from '../classes/appointment';

@Injectable()
export class ModelService {

    mainPageData: Promise<MainPageData>;
    contactData: Promise<Contact>;
    blogPostsData: Promise<BlogPost[]>;
    coursesData: Promise<CourseData>;
    performancesData: Promise<Performance[]>;
    teamData: Promise<Teacher[]>;
    locationData: Promise<LocationData>;
    imprintData: Promise<Imprint>;
    courseAppointments: Promise<Appointment[]>;

    constructor(
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

    getCourseAppointments() {
        if (_.isNil(this.courseAppointments)) {
            return Promise.all([this.getCourses(), this.getTeam(), this.getLocationData()]).then((result: any) => {
                const courses: CourseInformation[] = _.get(result[0], ['courses']);
                const teachers: Teacher[] = result[1];
                const locationData: LocationData = result[2];
                this.courseAppointments = this.scheduleService.getCourseAppointments(courses, teachers, locationData);
                return this.courseAppointments;
            });
        }
        return new Promise((resolve, reject) => {
            return resolve(this.courseAppointments);
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

    getContact() {
        if (_.isNil(this.contactData)) {
            this.contactData = this.contactService.getContact();
            return this.contactData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.contactData);
        });
    }

    getImprint() {
        if (_.isNil(this.imprintData)) {
            this.imprintData = this.imprintService.getImprint();
            return this.imprintData;
        }
        return new Promise((resolve, reject) => {
            return resolve(this.imprintData);
        });
    }
}
