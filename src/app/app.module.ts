import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import {HomePage, NavigationDetailsPage} from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ResultViewPage} from "../pages/result-view/result-view";
import {HttpModule} from "@angular/http";
import {ResultListPage} from "../pages/result-list/result-list";
import {MPService} from "../services/MPService";
import {GMDMatrix} from "../services/GoogleMapDistanceMatrixAPI";
import {Geolocation} from "@ionic-native/geolocation";
import {CommentListPage} from "../pages/comment-list/comment-list";
import {EvaluatePage} from "../pages/evaluate/evaluate";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NavigationDetailsPage,
    ResultViewPage,
      ResultListPage,
      CommentListPage,
      EvaluatePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    NavigationDetailsPage,
    ResultViewPage,
      ResultListPage,
      CommentListPage,
      EvaluatePage
  ],
  providers: [
    StatusBar,
    SplashScreen,MPService, GMDMatrix, Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
