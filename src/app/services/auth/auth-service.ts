import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';
import { BehaviorSubject, filter, map, Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from 'src/app/models/user-response';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://localhost:8080/jersey-simple-app/webapi';
  private _storage: Storage | null = null;
  public isAuthenticated = new BehaviorSubject<boolean | null>(null);


  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage['create']();
    this._storage = storage;
    
    // Vérifier si un token existe déjà au démarrage
    const token = await this.getToken();
    
      this.isAuthenticated.next(!!token);
    
  }

  onReady(): Observable<boolean> {
  return this.isAuthenticated.asObservable().pipe(
    filter(val => val !== null), // Ignore le null de départ
    map(val => val as boolean),  // On garantit un boolean
    take(1)                      // On complète l'observable
  );
}
 
  
  login(login: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.API_URL + '/login', login);
  }

   async saveSession(token: string, user: UserResponse) {
    await this._storage?.set('access_token', token);
    await this._storage?.set('user_profile', user);
    this.isAuthenticated.next(true);
  }

  async getToken() {
    return await this._storage?.get('access_token');
  }

  async getUser() {
    return await this._storage?.get('user_profile');
  }
  
 async logout() 
 {
    await this._storage?.clear();
    this.isAuthenticated.next(false);
  }
  
 
}
