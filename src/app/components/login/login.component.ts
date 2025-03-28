import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginResponse } from 'src/app/models/loginresponse';
import { AuthService } from 'src/app/services/auth.service';
import { TsService } from 'src/app/services/ts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login = {} as Login;

  constructor(private authService: AuthService, private tsService: TsService, private router: Router) { }

  selectLogin() {
    console.log(this.login);
    this.authService.login(this.login).subscribe((data: LoginResponse) => {
      console.log(data);
      if (data) {
        alert("Log In successfully");
        if (data.rol === "ADMIN") {
          console.log("ADMIN logueado");
          window.sessionStorage.removeItem("Role");
          window.sessionStorage.setItem("Role", data.rol);

          window.sessionStorage.removeItem("email");
          window.sessionStorage.setItem("email", data.email);
          this.router.navigate(['admin-tasks']);
        }
        if (data.rol === "USER") {
          console.log("USER logueado");
          window.sessionStorage.removeItem("Role");
          window.sessionStorage.setItem("Role", data.rol);
          window.sessionStorage.removeItem("email");
          window.sessionStorage.setItem("email", data.email);
          this.router.navigate(['user-tasks']);
          // this.router.navigate(['/refereedashboard']);
        }

      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      if (error) {
        alert(error.error.message);
        this.router.navigate(['/login']);
      }
    });
  }



}
