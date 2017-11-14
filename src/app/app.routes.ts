import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { Routes } from '@angular/router';



export const ROUTES : Routes = [
  { path: '' , component : HomeComponent },
  { path: 'login',     component : LoginComponent },
  { path: 'register',  component : RegisterComponent },
  { path: 'admin',     loadChildren: './modules/admin/admin.module#AdminModule'},
  { path: 'user',      loadChildren: './modules/user/user.module#UserModule'},
  { path: 'requests',  loadChildren: './modules/requests/requests.module#RequestsModule' },
  { path: 'spaces',    loadChildren: './modules/spaces/spaces.module#SpacesModule' },
  { path: 'pages',    loadChildren: './modules/pages/pages.module#PagesModule' }
]
/*
export const ROUTES: Routes = [
  { path: '',          component : HomeComponent },
  { path: 'login',     component : LoginComponent },
  { path: 'register',  component : RegisterComponent },
  { path: 'requests',  loadChildren: './modules/requests#RequestsModule' },
  { path: 'spaces',    loadChildren: './modules/spaces#SpacesModule' },
  { path: 'user',      loadChildren: './modules/user/user.module#UserModule'},
  { path: 'admin',     loadChildren: './modules/admin/admin.module#AdminModule'},
]; */
