import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestUser } from 'src/app/models/request-user';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/app/models/user-response';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) { }
  private API_URL = 'http://localhost:8080/jersey-simple-app/webapi/';
  
  register(user: RequestUser):Observable<UserResponse>{
    return this.http.post<UserResponse>(this.API_URL + 'register', user)
  }
}
