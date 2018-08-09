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
import { ImprintComponent } from "./sites/imprint/imprint.component";
import {ImprintService} from "./services/imprint.service";
import {CourseInformationComponent} from "./sites/courses/course-information/course-information.component";
import {TeacherDetailsComponent} from "./sites/team/teacher-details/teacher-details.component";

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'aktuelles', component: CurrentComponent },
  { path: 'team', component: TeamComponent },
  { path: 'lehrer/:id', component: TeacherDetailsComponent},
  { path: 'kurse', component: CoursesComponent },
  { path: 'kurse/:id', component: CourseDetailsComponent },
  { path: 'kurs-informationen', component: CourseInformationComponent },
  { path: 'auftritte', component: StageComponent },
  { path: 'auftritte/:id', component: PerformanceComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'location/:id', component: LocationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'impressum', component: ImprintComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    CurrentComponent,
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
    CourseInformationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'app'
    }),
    RouterModule.forRoot(routes),
    HttpModule,
    FormsModule
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
    ImprintService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
