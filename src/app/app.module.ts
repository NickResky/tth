import { ZenkitCollections } from './shared/constants/zenkit-collections';
import { CurrentDetailsComponent } from './sites/current/current-details/current-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainPageComponent } from './main-page/main-page.component';
import { TextAnimationComponent } from './main-page/text-animation/text-animation.component';
import { CurrentComponent } from './sites/current/current.component';
import { TeamComponent } from './sites/team/team.component';
import { CoursesComponent } from './sites/courses/courses.component';
import { StageComponent } from './sites/stage/stage.component';
import { GalleryComponent } from './sites/stage/gallery/gallery.component';
import { LocationsComponent } from './sites/locations/locations.component';
import { ContactComponent } from './sites/contact/contact.component';
import { MainPageSectionComponent } from './main-page/main-page-section/main-page-section.component';
import { CoursesOverviewComponent } from './courses-overview/courses-overview.component';
import { PerformanceComponent } from './sites/stage/performance/performance.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { CourseDetailsComponent } from './sites/courses/course-details/course-details.component';
import { LocationComponent } from './sites/locations/location/location.component';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { ImprintComponent } from './sites/imprint/imprint.component';
import { CourseInformationComponent } from './sites/courses/course-information/course-information.component';
import { TeacherDetailsComponent } from './sites/team/teacher-details/teacher-details.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { PrivacyComponent } from './sites/privacy/privacy.component';
import { NavigationConfig } from './shared/constants/navigation-config';

import {
  ModelService,
  ContactService,
  CoursesService,
  CurrentService,
  ImprintService,
  LocationsService,
  MainPageService,
  ScheduleService,
  StageService,
  TeamService,
  NavigationConfigService,
  ZenkitCollectionsService,
  SeoService,

  App01Component,
  ComponentsPluginModule
} from 'webapps-reschke-common';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    data: {
      title: 'Tanztheater Anita Hanke',
      metatags: {
        // tslint:disable-next-line:max-line-length
        description: 'Tanzschule in Markgröningen und Ludwigsburg. Kursangebot von Ballett über Jazz und Modern bis hin zu Hip Hop und Breakdance',
        keywords: 'Tanzschule, Markgröningen, Ludwigsburg, Tanztheater, Tanzen, Ballett, Jazz, Musical, Hip Hop, Breakdance, Modern, Contemporary, Kreativ, Kinder'
      }
    }
  },
  {
    path: 'blog',
    component: CurrentComponent,
    data: {
      title: 'Aktuelles | Tanztheater Anita Hanke',
      metatags: {
        description: 'Neuigkeiten aus dem Tanztheater Anita Hanke in Markgröningen und Ludwigsburg',
        keywords: 'Neuigkeiten, Tanzschule, Markgröningen, Ludwigsburg, Tanztheater'
      }
    }
  },
  {
    path: 'blog/:shortId',
    component: CurrentDetailsComponent
  },
  {
    path: 'blog/:shortId/:title/:date',
    component: CurrentDetailsComponent
  },
  {
    path: 'team',
    component: TeamComponent,
    data: {
      title: 'Team | Tanztheater Anita Hanke',
      metatags: {
        description: 'Alle Lehrer des Tanztheater Anita Hanke in Markgröningen und Ludwigsburg',
        keywords: 'Lehrer, Team, Tanzschule, Markgröningen, Ludwigsburg, Tanztheater'
      }
    }
  },
  {
    path: 'lehrer/:teacherShortId',
    component: TeacherDetailsComponent
  },
  {
    path: 'lehrer/:teacherShortId/:teacherName',
    component: TeacherDetailsComponent
  },
  {
    path: 'kurse',
    component: CoursesComponent,
    data: {
      title: 'Kurse | Tanztheater Anita Hanke',
      metatags: {
        // tslint:disable-next-line:max-line-length
        description: 'Kursangebot (Ballett, Kreativer Kindertanz, Jazz, Modern, Contemporary, Musical Jazz, Hip Hop, Breakdance) des Tanztheater Anita Hanke in Markgröningen und Ludwigsburg',
        keywords: 'Kurse, Tanzschule, Markgröningen, Ludwigsburg, Tanztheater, Ballett, Jazz, Musical, Hip Hop, Breakdance, Modern, Contemporary, Kreativ'
      }
    }
  },
  {
    path: 'kurse/:shortId',
    component: CourseDetailsComponent
  },
  {
    path: 'kurse/:shortId/:title',
    component: CourseDetailsComponent
  },
  {
    path: 'kurs-informationen',
    component: CourseInformationComponent,
    data: {
      title: 'Kurs Informationen | Tanztheater Anita Hanke',
      metatags: {
        description: 'Preise und Stundenpläne des Tanztheater Anita Hanke in Markgröningen und Ludwigsburg',
        keywords: 'Tanzschule, Markgröningen, Ludwigsburg, Tanztheater, Preis, Stundenplan'
      }
    }
  },
  {
    path: 'auftritte',
    component: StageComponent,
    data: {
      title: 'Auftritte | Tanztheater Anita Hanke',
      metatags: {
        description: 'vergangene Auftritte des Tanztheater Anita Hanke in Markgröningen und Ludwigsburg',
        keywords: 'Tanzschule, Markgröningen, Ludwigsburg, Tanztheater, Auftritt'
      }
    }
  },
  {
    path: 'auftritte/:shortId',
    component: PerformanceComponent
  },
  {
    path: 'auftritte/:shortId/:title/:date',
    component: PerformanceComponent
  },
  {
    path: 'standorte',
    component: LocationsComponent,
    data: {
      title: 'Standorte | Tanztheater Anita Hanke',
      metatags: {
        description: 'Standorte des Tanztheater Anita Hanke in Markgröningen und Ludwigsburg',
        keywords: 'Tanzschule, Markgröningen, Ludwigsburg, Tanztheater, Standort'
      }
    }
  },
  {
    path: 'standorte/:locationShortId',
    component: LocationComponent
  },
  {
    path: 'standorte/:locationShortId/:locationTitle',
    component: LocationComponent
  },
  {
    path: 'kontakt',
    component: ContactComponent,
    data: {
      title: 'Kontakt | Tanztheater Anita Hanke',
      metatags: {
        description: 'Tanztheater Anita Hanke in Markgröningen und Ludwigsburg',
        keywords: 'Tanzschule, Markgröningen, Ludwigsburg, Tanztheater'
      }
    }
  },
  {
    path: 'impressum',
    component: ImprintComponent,
    data: {
      title: 'Impressum | Tanztheater Anita Hanke',
      metatags: {
        description: 'Tanztheater Anita Hanke in Markgröningen und Ludwigsburg',
        keywords: 'Tanzschule, Markgröningen, Ludwigsburg, Tanztheater'
      }
    }
  },
  {
    path: 'datenschutz',
    component: PrivacyComponent,
    data: {
      title: 'Datenschutz | Tanztheater Anita Hanke',
      metatags: {
        description: 'Tanztheater Anita Hanke in Markgröningen und Ludwigsburg',
        keywords: 'Tanzschule, Markgröningen, Ludwigsburg, Tanztheater'
      }
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    MainPageComponent,
    CurrentComponent,
    CurrentDetailsComponent,
    TeamComponent,
    TeacherDetailsComponent,
    CoursesComponent,
    StageComponent,
    GalleryComponent,
    LocationsComponent,
    ContactComponent,
    MainPageSectionComponent,
    CoursesOverviewComponent,
    PerformanceComponent,
    ImageSliderComponent,
    CourseDetailsComponent,
    LocationComponent,
    HeaderImageComponent,
    ImprintComponent,
    CourseInformationComponent,
    ScheduleComponent,
    PrivacyComponent,
    TextAnimationComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'app'
    }),
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule,
    ComponentsPluginModule
  ],
  providers: [
    ModelService,
    ZenkitCollectionsService,
    MainPageService,
    StageService,
    CoursesService,
    TeamService,
    LocationsService,
    ContactService,
    CurrentService,
    ImprintService,
    ScheduleService,
    SeoService,
    {
      provide: ZenkitCollectionsService,
      useValue: ZenkitCollections
    },
    {
      provide: NavigationConfigService,
      useValue: NavigationConfig
    }
  ],
  bootstrap: [App01Component]
})
export class AppModule { }
