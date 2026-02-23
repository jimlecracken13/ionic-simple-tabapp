import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from 'src/app/models/user-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = "http://localhost:8080/jersey-simple-app/webapi/users"
  constructor(private http: HttpClient) {}
  getAllUsers(): Observable<UserResponse[]>{
    return this.http.get<UserResponse[]>(this.API_URL);
  }
  
}
