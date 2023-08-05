import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { UserService } from './user/user.service';
import { NewsService } from './news/news.service';

import { environment } from '../environments/environment';
import { NewsComponent } from './news/news/news.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent, NewsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    CoreModule,
    UserModule,
    NewsModule,
    BrowserAnimationsModule,
  ],

  providers: [UserService, NewsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
