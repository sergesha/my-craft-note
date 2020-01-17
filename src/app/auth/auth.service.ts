import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { from, Observable } from 'rxjs';

import * as firebase from 'firebase';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<User | null> = this.afAuth.user;

  constructor(private afAuth: AngularFireAuth) {
  }

  public register(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  public login(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  public logout(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }
}
