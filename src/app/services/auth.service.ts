import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Login } from '../models/login';
import { LoginResponse } from '../models/loginresponse';
import { Signup } from '../models/signup';
import { SignupResponse } from '../models/signupresponse';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl =  'http://localhost:8080/usuarios/login';
  private signupUrl = 'http://localhost:8080/usuarios/create';

  constructor(private http: HttpClient) { }

  login(login: Login) {
    return this.http.post<LoginResponse>(this.loginUrl, login);
  }

  register(signup: Signup) {
    return this.http.post<SignupResponse>(this.signupUrl, signup)
  }

}
