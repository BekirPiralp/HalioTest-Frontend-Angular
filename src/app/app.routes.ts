import { Routes } from '@angular/router';
import { Login } from '../components/page/login/main/login/login';
import { Register } from '../components/page/register/main/register/register';
import { Home } from '../components/page/home/main/home/home';

export const routes: Routes = [
    {path:"home",component:Home},
    {path:"",component:Home},
    {path:"#",component:Home},
    {path:'login',component:Login},
    {path:'register',component:Register},
    {path:"**",redirectTo:"login"}
];
