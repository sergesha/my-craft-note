import { NgModule } from '@angular/core';
import {
  redirectLoggedInTo,
  redirectUnauthorizedTo,
  AngularFireAuthGuard,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AboutComponent } from './layout/about/about.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([ 'login' ]);
const redirectLoggedInToFeatures = () => redirectLoggedInTo([ 'features' ]);

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectLoggedInToFeatures },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectLoggedInToFeatures },
  },
  {
    path: 'features',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  { path: '', redirectTo: '/features', pathMatch: 'full' },
  { path: '**', redirectTo: '/features', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
