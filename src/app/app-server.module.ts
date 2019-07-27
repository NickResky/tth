import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import {
    ModelPluginModule
} from 'webapps-reschke-common';
  import { SeoService } from './services/seo.service';

@NgModule({
    imports: [
        BrowserModule.withServerTransition({
            appId: 'app'
          }),
        ServerModule,
        AppModule
    ],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
