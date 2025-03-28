import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from "./components/register/register.component";
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { AdminTasksComponent} from "./components/admin-tasks/admin-tasks.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  // Redirect to login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-tasks', component: UserTasksComponent },
  { path: 'admin-tasks', component: AdminTasksComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
