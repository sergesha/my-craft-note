import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FeaturesModule } from './features/features.module';
import { LayoutModule } from './layout/layout.module';

export const firebaseConfig = {
  apiKey: 'AIzaSyAsVKTcPZ0moW2W10HhDb2KW_w6ENtM0T4',
  authDomain: 'craftnote-web-challenge.firebaseapp.com',
  databaseURL: 'https://craftnote-web-challenge.firebaseio.com',
  projectId: 'craftnote-web-challenge',
  storageBucket: 'craftnote-web-challenge.appspot.com',
  messagingSenderId: '926271509569',
  appId: '1:926271509569:web:bf11e89892f3bb73fc62c0',
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    LayoutModule,
    AuthModule,
    FeaturesModule,
  ],
  providers: [ AngularFireAuthGuard ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
