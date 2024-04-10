import { Routes } from '@angular/router';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [

    {path: '', component:LandingPageComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'login', component:LoginComponent},



];

