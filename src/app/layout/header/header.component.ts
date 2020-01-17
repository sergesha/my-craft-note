import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { asyncScheduler, Observable } from 'rxjs';
import { delay, observeOn } from 'rxjs/operators';

import { User } from 'firebase';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent implements OnInit {
  public user$: Observable<User | null>;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.user;
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
