import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { NumbersPageComponent } from './numbers-page/numbers-page.component';
import { PasswordRestoreComponent } from './password-restore/password-restore.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'restorepass', component: PasswordRestoreComponent },
  { path: 'login', component: LogInComponent },
  { path: 'numbers', component: NumbersPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

 export const routingComponents = [RegistrationComponent,PasswordRestoreComponent,LogInComponent]
