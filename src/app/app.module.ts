import { CurrentDetailsComponent } from './sites/current/current-details/current-details.component';
import { CookiesNotificationComponent } from './components/cookies-notification/cookies-notification.component';
import { DynamicContentService } from './services/dynamic-content.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MainPageService } from './services/main-page.service';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CurrentComponent } from './sites/current/current.component';
import { CurrentService } from './services/current.service';
import { TeamComponent } from './sites/team/team.component';
import { TeamService } from './services/team.service';
import { CoursesComponent } from './sites/courses/courses.component';
import { CoursesService } from './services/courses.service';
import { StageComponent } from './sites/stage/stage.component';
import { StageService } from './services/stage.service';
import { GalleryComponent } from './sites/stage/gallery/gallery.component';
import { LocationsComponent } from './sites/locations/locations.component';
import { LocationsService } from './services/locations.service';
import { ContactComponent } from './sites/contact/contact.component';
import { ContactService } from './services/contact.service';
import { ModelService } from './services/model.service';
import { MainPageSectionComponent } from './main-page/main-page-section/main-page-section.component';
import { CoursesOverviewComponent } from './courses-overview/courses-overview.component';
import { PerformanceComponent } from './sites/stage/performance/performance.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { CourseDetailsComponent } from './sites/courses/course-details/course-details.component';
import { LocationComponent } from './sites/locations/location/location.component';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { ImprintComponent } from './sites/imprint/imprint.component';
import { ImprintService } from './services/imprint.service';
import { CourseInformationComponent } from './sites/courses/course-information/course-information.component';
import { TeacherDetailsComponent } from './sites/team/teacher-details/teacher-details.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ScheduleService } from './services/schedule.service';
import { UtilityService } from './services/utility.service';
import {SeoService} from "./services/seo.service";
// import { YoutubePlayerModule } from 'ngx-youtube-player';

const routes: Routes = [
  { path: '',
    component: MainPageComponent,
    data: {
      title: "Tanztheater Anita Hanke",
      metatags: {
        description: "Tanzschule in Markgröningen und Ludwigsburg. Kursangebot von Ballett über Jazz und Modern bis hin zu Hip Hop und Breakdance",
        keywords: "Tanzschule, Markgröningen, Ludwigsburg, Tanztheater, Tanzen, Ballett, Jazz, Musical, Hip Hop, Breakdance, Modern, Contemporary, Kreativ, Kinder"
      }
    }
  },
  { path: 'blog',
    component: CurrentComponent,
      data: {
      title: "Aktuelles | Tanztheater Anita Hanke",
        metatags: {
          description: "Neuigkeiten aus dem Tanztheater Anita Hanke in Markgröningen und Ludwigsburg",
          keywords: "Neuigkeiten, Tanzschule, Markgröningen, Ludwigsburg, Tanztheater"
      }
    }
  },
  { path: 'blog/:shortId',
    component: CurrentDetailsComponent
  },
  { path: 'blog/:shortId/:title/:date',
    component: CurrentDetailsComponent
  },
  { path: 'team',
    component: TeamComponent,
    data: {
      title: "Team | Tanztheater Anita Hanke",
      metatags: {
        description: "Alle Lehrer des Tanztheater Anita Hanke in Markgröningen und Ludwigsburg",
        keywords: "Lehrer, Team, Tanzschule, Markgröningen, Ludwigsburg, Tanztheater"
      }
    }
  },
  { path: 'lehrer/:id',
    component: TeacherDetailsComponent
  },
  { path: 'kurse',
    component: CoursesComponent,
    data: {
      title: "Kurse | Tanztheater Anita Hanke",
      metatags: {
        description: "Kursangebot (Ballett, Kreativer Kindertanz, Jazz, Modern, Contemporary, Musical Jazz, Hip Hop, Breakdance) des Tanztheater Anita Hanke in Markgröningen und Ludwigsburg",
        keywords: "Kurse, Tanzschule, Markgröningen, Ludwigsburg, Tanztheater, Ballett, Jazz, Musical, Hip Hop, Breakdance, Modern, Contemporary, Kreativ"
      }
    }
  },
  { path: 'kurse/:shortId',
    component: CourseDetailsComponent
  },
  { path: 'kurse/:shortId/:title',
    component: CourseDetailsComponent
  },
  { path: 'kurs-informationen',
    component: CourseInformationComponent,
    data: {
      title: "Kurs Informationen | Tanztheater Anita Hanke",
      metatags: {
        description: "Preise und Stundenpläne des Tanztheater Anita Hanke in Markgröningen und Ludwigsburg",
        keywords: "Tanzschule, Markgröningen, Ludwigsburg, Tanztheater, Preis, Stundenplan"
      }
    }
  },
  { path: 'auftritte',
    component: StageComponent,
    data: {
      title: "Auftritte | Tanztheater Anita Hanke",
      metatags: {
        description: "vergangene Auftritte des Tanztheater Anita Hanke in Markgröningen und Ludwigsburg",
        keywords: "Tanzschule, Markgröningen, Ludwigsburg, Tanztheater, Auftritt"
      }
    }
  },
  { path: 'auftritte/:shortId',
    component: PerformanceComponent
  },
  { path: 'auftritte/:shortId/:title/:date',
    component: PerformanceComponent
  },
  { path: 'standorte',
    component: LocationsComponent,
    data: {
      title: "Standorte | Tanztheater Anita Hanke",
      metatags: {
        description: "Standorte des Tanztheater Anita Hanke in Markgröningen und Ludwigsburg",
        keywords: "Tanzschule, Markgröningen, Ludwigsburg, Tanztheater, Standort"
      }
    }
  },
  { path: 'standorte/:id',
    component: LocationComponent
  },
  { path: 'kontakt',
    component: ContactComponent,
    data: {
      title: "Kontakt | Tanztheater Anita Hanke",
      metatags: {
        description: "Tanztheater Anita Hanke in Markgröningen und Ludwigsburg",
        keywords: "Tanzschule, Markgröningen, Ludwigsburg, Tanztheater"
      }
    }
  },
  { path: 'impressum',
    component: ImprintComponent,
    data: {
      title: "Impressum | Tanztheater Anita Hanke",
      metatags: {
        description: "Tanztheater Anita Hanke in Markgröningen und Ludwigsburg",
        keywords: "Tanzschule, Markgröningen, Ludwigsburg, Tanztheater"
      }
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
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
    CookiesNotificationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'app'
    }),
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule
    // YoutubePlayerModule
  ],
  providers: [
    MainPageService,
    CurrentService,
    TeamService,
    DynamicContentService,
    StageService,
    CoursesService,
    LocationsService,
    ContactService,
    ModelService,
    ImprintService,
    ScheduleService,
    UtilityService,
    SeoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
