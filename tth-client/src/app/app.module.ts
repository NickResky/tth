import { DynamicContentService } from './services/dynamic-content.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';

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

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'aktuelles', component: CurrentComponent },
  { path: 'team', component: TeamComponent },
  { path: 'kurse', component: CoursesComponent },
  { path: 'auftritte', component: StageComponent },
  { path: 'auftritte/:id', component: PerformanceComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    CurrentComponent,
    TeamComponent,
    CoursesComponent,
    StageComponent,
    GalleryComponent,
    LocationsComponent,
    ContactComponent,
    MainPageSectionComponent,
    CoursesOverviewComponent,
    PerformanceComponent,
    ImageSliderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule
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
    ModelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
