import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitRequest } from 'src/app/models/produit-request';
import { ResponseProduit } from 'src/app/models/response-produit';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private API_URL = "http://localhost:8080/jersey-simple-app/webapi/produits"
  constructor(private http: HttpClient) { }

  getAll(): Observable<ResponseProduit[]> {
    return this.http.get<ResponseProduit[]>(this.API_URL);
  }
  
  getProduitByCodeBar(codeBar: string): Observable<ResponseProduit> {
    return this.http.get<ResponseProduit>(this.API_URL + '/' + codeBar);
  }

  updateProduit(produit: ProduitRequest, id: string): Observable<ResponseProduit> {
    return this.http.put<ResponseProduit>(this.API_URL + '/' + id, produit);
  }

  addProduit(produit: ProduitRequest): Observable<ResponseProduit> {
    return this.http.post<ResponseProduit>(this.API_URL, produit);
  }
  
}
