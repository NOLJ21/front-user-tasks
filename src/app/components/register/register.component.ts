import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { PasswordSetting } from 'src/app/models/passwordsetting';
import { Signup } from 'src/app/models/signup';
import { SignupResponse } from 'src/app/models/signupresponse';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signup = { } as Signup;

  constructor(private authService: AuthService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {

  }

  selectedSignUp() {
    this.authService.register(this.signup).subscribe((data: SignupResponse) => {
      console.log(data)
    });
    this.router.navigate(['login']);
  }

}
