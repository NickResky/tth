import { App01Component } from 'webapps-reschke-common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';


@NgModule({
    imports: [
        BrowserModule.withServerTransition({
            appId: 'app'
          }),
        ServerModule,
        AppModule
    ],
    bootstrap: [App01Component]
})
export class AppServerModule { }
