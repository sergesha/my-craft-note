import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { REGEX } from '@shared/helpers/regex';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ],
})
export class RegisterComponent implements OnInit {
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
    const validatorEqualPasswords: ValidatorFn =
      (control: AbstractControl): ValidationErrors | null => {
        const password: string = control.root.get('password') && control.root.get('password').value;
        const repeatPassword: string = control.root.get('repeatPassword') && control.root.get('repeatPassword').value;

        return password && password !== repeatPassword
          ? { notEqualPasswords: true }
          : null;
      };


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
        Validators.pattern(REGEX.password),
        Validators.minLength(8),
      ] ],
      repeatPassword: [ null, [
        Validators.required,
        validatorEqualPasswords,
      ] ],
    });
  }

  private register(email: string, password: string): void {
    this.authService.register(email, password).subscribe(
      (data: firebase.auth.UserCredential) => {
        const snackBarRef = this.snackBar.open('Account successfully registered!', 'Close', {
          duration: 2000,
        });

        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/login');
        });
      },
      (error: { message: string }) => {
        this.snackBar.open(error.message || 'Error occurred!', 'Close', {
          duration: 3000,
        });
      },
    );
  }

  public onSubmit(): void {
    const { email, password } = this.form.value;

    if (this.form.valid) {
      this.register(email, password);
    }
  }
}
