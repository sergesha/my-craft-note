import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { REGEX } from '@shared/helpers/regex';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: [ null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.pattern(REGEX.email),
        ],
      } ],
      password: [ null, [
        Validators.required,
      ] ],
    });
  }

  private login(email: string, password: string): void {
    this.authService.login(email, password).subscribe(
      (data: firebase.auth.UserCredential) => {
        this.router.navigateByUrl('/');
      },
      (error: { message: string }) => {
        this.snackBar.open(error.message, null, {
          duration: 2000,
        });
      },
    );
  }

  public onSubmit(): void {
    const { email, password } = this.form.value;

    if (this.form.valid) {
      this.login(email, password);
    }
  }
}
