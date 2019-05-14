import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PushNotificationsService, PushNotificationsModule } from 'ng-push';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { WindowRef } from './window.ref';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayNotificationService } from './display.notification';
import { LoadingComponent } from './loading/loading.component';
import { SwitchService } from './switch.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    PushNotificationsModule,
    SlimLoadingBarModule.forRoot()
  ],
  providers: [
    SwitchService,
    NotificationsService,
    PushNotificationsService,
    DisplayNotificationService,
    WindowRef
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
