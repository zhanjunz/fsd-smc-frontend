import { BodyComponent } from './interfaces/body-component';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef } from '@angular/core';
import { BodyDirective } from './directives/body.directive';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { User } from './auth/model/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './auth/service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  currentUser: User;
  authSubscription: Subscription;

  @ViewChild(BodyDirective, {static : true}) appBody: BodyDirective;

  constructor(private componentFactoryResolver : ComponentFactoryResolver, private authenticationService: AuthenticationService) { 
    this.authSubscription = this.authenticationService.currentUser.subscribe((x) => this.currentUser = x);
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  showSignup() {
    this.showComponentAppBody(SignupPageComponent);
  }

  showLogin() {
    this.showComponentAppBody(LoginPageComponent);
  }

  showComponentAppBody(component : BodyComponent) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(<any>component);
    const viewContainerRef = this.appBody.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
  }

}
