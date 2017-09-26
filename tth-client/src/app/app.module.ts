import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SiteService } from './main-page/site.service';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CurrentComponent } from './sites/current/current.component';
import { CurrentService } from './sites/current/current.service';
import { TeamComponent } from './sites/team/team.component';
import { TeamService } from './sites/team/team.service';
import { CoursesComponent } from './sites/courses/courses.component';
import { StageComponent } from './sites/stage/stage.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'aktuelles', component: CurrentComponent },
  { path: 'team', component: TeamComponent },
  { path: 'kurse', component: CoursesComponent },
  { path: 'buehne', component: StageComponent }
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
    StageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    SiteService,
    CurrentService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
