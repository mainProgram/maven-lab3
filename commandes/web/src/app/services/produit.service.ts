import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {ResourceService} from './resource.service';
import {IApiResponse} from '../models/api-response';
import {Produit} from "../models/produit.model";
let baseUrl = "http://localhost:8080/produits"

@Injectable({
  providedIn: 'root'
})
export class ProduitService extends ResourceService<Produit>{

  fetchProduits() {
    return this.http
      .get<IApiResponse>(baseUrl)
      .pipe(
        map((response) => response as Produit[]),
        tap(this.setResources.bind(this))
      );
  }

  addProduit(produit: Produit) {
    return this.http
      .post<IApiResponse>(baseUrl, produit)
      .pipe(
        map((response) => response as Produit[]),
        tap(this.setResources.bind(this))
      );
  }

  getProduit(id: string) {
    return this.http
      .get<IApiResponse>(baseUrl+ "/"+ id)
  }

  deleteProduit(id: string) {
    return this.http
      .delete<IApiResponse>(`${baseUrl}/${id}`)
      .pipe(tap(() => this.removeResource(id)));
  }

  updateProduit(id:string, produit: Produit) {
    return this.http
      .put<IApiResponse>(`${baseUrl}/${id}`, produit)
      .pipe(
        map((response) => response as Produit[]),
        tap(this.setResources.bind(this))
      );
  }
}
