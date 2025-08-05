import { Routes } from '@angular/router';
import { Login } from '../components/page/login/main/login/login';
import { Register } from '../components/page/register/main/register/register';

export const routes: Routes = [
    {path:'login',component:Login},
    {path:'register',component:Register},
    {path:"**",redirectTo:"login"}
];
