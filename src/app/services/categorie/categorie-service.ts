import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategorieRequest } from 'src/app/models/categorie-request';
import { ResponseCategorie } from 'src/app/models/response-categorie';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private API_URL = "http://localhost:8080/jersey-simple-app/webapi/categories"
  constructor(private http: HttpClient){}

  private categorieSubject = new BehaviorSubject<ResponseCategorie[]>([]);

  //creer un observable public(en lecture seule)
  categorieOb = this.categorieSubject.asObservable();
  
  getAll(): Observable<ResponseCategorie[]>{
    return this.http.get<ResponseCategorie[]>(this.API_URL);
  }
  getByCodeBar(codeBar: string): Observable<ResponseCategorie>{
    return this.http.get<ResponseCategorie>(this.API_URL + '/' + codeBar);
  }

  updateCategorie(categorie: CategorieRequest, id:string): Observable<ResponseCategorie>{
    return this.http.put<ResponseCategorie>(this.API_URL + '/' + id, categorie);
  }

  deleteCategorie(libelle:string): Observable<ResponseCategorie>{
    return this.http.delete<ResponseCategorie>(this.API_URL + '/' + libelle);
  }

  addCategorie(categorie: CategorieRequest): Observable<ResponseCategorie>{
    return this.http.post<ResponseCategorie>(this.API_URL, categorie);
  }
}
