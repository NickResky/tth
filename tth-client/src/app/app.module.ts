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

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'aktuelles', component: CurrentComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    CurrentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    SiteService,
    CurrentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
