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
import { CurrentService } from './sites/current/current.service';
import { TeamComponent } from './sites/team/team.component';
import { TeamService } from './services/team.service';
import { CoursesComponent } from './sites/courses/courses.component';
import { CoursesService } from './services/courses.service';
import { StageComponent } from './sites/stage/stage.component';
import { StageService } from './services/stage.service';
import { GalleryComponent } from './sites/stage/gallery/gallery.component';
import { ModelService } from './services/model.service';
import { MainPageSectionComponent } from './main-page/main-page-section/main-page-section.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'aktuelles', component: CurrentComponent },
  { path: 'team', component: TeamComponent },
  { path: 'kurse', component: CoursesComponent },
  { path: 'buehne', component: StageComponent },
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
    GalleryComponent
    MainPageSectionComponent
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
    ModelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
