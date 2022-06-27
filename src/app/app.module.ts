import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { CookiesNotificationComponent } from "./components/cookies-notification/cookies-notification.component";
import { DynamicContentService } from "./services/dynamic-content.service";
import { CurrentDetailsComponent } from "./sites/current/current-details/current-details.component";

import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderImageComponent } from "./components/header-image/header-image.component";
import { SbMainPageHeaderComponent } from "./components/sb-main-page-header/sb-main-page-header.component";
import { ScheduleComponent } from "./components/schedule/schedule.component";
import { CoursesOverviewComponent } from "./courses-overview/courses-overview.component";
import { ImageSliderComponent } from "./image-slider/image-slider.component";
import { MainPageSectionComponent } from "./main-page/main-page-section/main-page-section.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { TextAnimationComponent } from "./main-page/text-animation/text-animation.component";
import { ContactService } from "./services/contact.service";
import { CoursesService } from "./services/courses.service";
import { CurrentService } from "./services/current.service";
import { ImprintService } from "./services/imprint.service";
import { LocationsService } from "./services/locations.service";
import { MainPageService } from "./services/main-page.service";
import { ModelService } from "./services/model.service";
import { ScheduleService } from "./services/schedule.service";
import { SeoService } from "./services/seo.service";
import { StageService } from "./services/stage.service";
import { TeamService } from "./services/team.service";
import { UtilityService } from "./services/utility.service";
import { FooterComponent } from "./shared/footer/footer.component";
import { HeaderComponent } from "./shared/header/header.component";
import { ContactComponent } from "./sites/contact/contact.component";
import { CourseDetailsComponent } from "./sites/courses/course-details/course-details.component";
import { CourseInformationComponent } from "./sites/courses/course-information/course-information.component";
import { CoursesComponent } from "./sites/courses/courses.component";
import { CurrentComponent } from "./sites/current/current.component";
import { ImprintComponent } from "./sites/imprint/imprint.component";
import { LocationComponent } from "./sites/locations/location/location.component";
import { LocationsComponent } from "./sites/locations/locations.component";
import { PrivacyComponent } from "./sites/privacy/privacy.component";
import { GalleryComponent } from "./sites/stage/gallery/gallery.component";
import { PerformanceComponent } from "./sites/stage/performance/performance.component";
import { StageComponent } from "./sites/stage/stage.component";
import { TeacherDetailsComponent } from "./sites/team/teacher-details/teacher-details.component";
import { TeamComponent } from "./sites/team/team.component";
// import { YoutubePlayerModule } from 'ngx-youtube-player';

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    data: {
      title: "Susanne Brenner",
      metatags: {
        description: "Susanne Brenner",
        keywords: "Susanne Brenner",
      },
    },
  },
  {
    path: "impressum",
    component: ImprintComponent,
    data: {
      title: "Impressum | Susanne Brenner",
      metatags: {
        description: "Susanne Brenner",
        keywords: "Susanne Brenner",
      },
    },
  },
  {
    path: "datenschutz",
    component: PrivacyComponent,
    data: {
      title: "Datenschutz |Susanne Brenner",
      metatags: {
        description: "Susanne BrennerSusanne Brenner",
        keywords: "Susanne Brenner",
      },
    },
  },
  { path: "**", redirectTo: "" },
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
    CookiesNotificationComponent,
    PrivacyComponent,
    TextAnimationComponent,
    SbMainPageHeaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: "app",
    }),
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    HttpClientModule,
    FormsModule,
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
    SeoService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
