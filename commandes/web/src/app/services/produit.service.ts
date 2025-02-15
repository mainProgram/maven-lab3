import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs';
import {ResourceService} from './resource.service';
import {Produit} from "../models/produit.model";
let baseUrl = "http://localhost:8080/produits"

@Injectable({
  providedIn: 'root'
})
export class ProduitService extends ResourceService<Produit>{

  fetchProduits() {
    return this.http
      .get<Produit[]>(baseUrl)
      .pipe(
        map((response) => response as Produit[]),
        tap(this.setResources.bind(this))
      );
  }

  addProduit(produit: Produit) {
    return this.http
      .post<Produit>(baseUrl, produit)
      .pipe(
        tap((newProduit) => this.upsertResource(newProduit))
      );
  }

  getProduit(id: number) {
    return this.http
      .get<Produit>(baseUrl+ "/"+ id)
  }

  deleteProduit(id: number) {
    return this.http
      .delete<Produit>(`${baseUrl}/${id}`)
      .pipe(tap(() => this.removeResource(id)));
  }

  updateProduit(id:number, produit: Produit) {
    return this.http
      .put<Produit>(`${baseUrl}/${id}`, produit)
      .pipe(
        tap((newProduit) => this.upsertResource(newProduit)) // Utiliser upsertResource au lieu de setResources
      );
  }
}
