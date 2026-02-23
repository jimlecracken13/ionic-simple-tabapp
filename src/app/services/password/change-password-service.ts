import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChangePassword } from 'src/app/models/change-password';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  constructor(private http: HttpClient) { }

  private url = "http://localhost:8080/jersey-simple-app/webapi/change-password";
  changePassword(change: ChangePassword) {
    console.log(change);
    this.http.post(this.url, change)
    return this.http.post(this.url, change);
  }
  
}
