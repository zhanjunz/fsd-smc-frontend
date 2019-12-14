import { User } from './../../auth/model/user';
import { LoginFormModel } from './../../model/login-form-model';
import { BodyComponent } from './../../interfaces/body-component';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/auth/service/authentication.service';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, BodyComponent, OnDestroy {

  loginForm: FormGroup;
  currentUser: User;
  authSubscription: Subscription;

  loading = false;
  submitted = false;
  loginError = false;
  errorMessage: String;

  constructor(private http: HttpClient, private authService : AuthenticationService) {
    this.authSubscription = this.authService.currentUser.subscribe((x) => this.currentUser = x);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }  

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  login(formValue : LoginFormModel) {
    this.loading = true;
    this.authService.login(formValue.username, formValue.password)
      .pipe(first())
      .subscribe(
        data => {
          //login success
          this.loading = false;
          this.loginForm.reset();
        },
        error => {
            this.loginError = true;
            if(error.status == 401) {
              this.errorMessage = "Invalid username or password";
            } else {
              this.errorMessage = "Error occured while signing in, please try again after some time.";
            }
            this.loading = false;
        }
      );
  }

}
