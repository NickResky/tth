import { SiteService } from './main-page/site.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CurrentComponent } from './sites/current/current.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    CurrentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    SiteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
