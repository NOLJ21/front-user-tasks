import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Signup } from '../models/signup';
import { SignupResponse } from '../models/signupresponse';
import { environment } from 'src/environment/environment';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private readUrl = environment.apiUrl + '/api/auth/read';
  private updateUrl = environment.apiUrl + '/api/auth/update';
  private deleteUrl = environment.apiUrl + '/api/auth/delete';

  constructor(private http: HttpClient, private router: Router) { }

  readUsers() {
    return this.http.get<User[]>(this.readUrl);
  }

  readUser(id: number) {
    return this.http.get<User>(this.readUrl + "/" + id);
  }

  updateUser(id: number, update: Signup) {
    return this.http.put<SignupResponse>(this.updateUrl + "/" + id, update);
  }

  deleteUser(id: number) {
    return this.http.delete<SignupResponse>(this.deleteUrl + "/" + id);
  }
}
