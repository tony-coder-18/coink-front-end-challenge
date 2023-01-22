import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
