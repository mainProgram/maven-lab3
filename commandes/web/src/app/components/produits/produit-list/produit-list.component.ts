import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ProduitService} from "../../../services/produit.service";
import {LoaderService} from "../../../services/loader.service";
import {finalize, take} from "rxjs";
import Swal from 'sweetalert2';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {LoaderComponent} from "../../loader/loader.component";
import {MatDialog} from "@angular/material/dialog";
import {ProduitAddUpdateComponent} from "../produit-add-update/produit-add-update.component";
import {Produit} from "../../../models/produit.model";

@Component({
  selector: 'app-produit-list',
  standalone: true,
  imports: [
    MatCardHeader,
    NgForOf,
    MatIcon,
    MatCardTitle,
    MatCardActions,
    MatCard,
    MatCardContent,
    RouterLink,
    LoaderComponent,
    NgIf
  ],
  templateUrl: './produit-list.component.html',
  styleUrl: './produit-list.component.css'
})
export class ProduitListComponent {
  router = inject(Router);
  produitService = inject(ProduitService);
  loaderService = inject(LoaderService);
  loading = inject(LoaderService).loading;

  constructor(
    public dialog: MatDialog,
  ) {
    this.loaderService.showLoader()
    this.produitService.fetchProduits().pipe(
      take(1),
      finalize(() => this.loaderService.hideLoader())
    ).subscribe();
  }

  get produits() {
    return this.produitService.resources;
  }

  deleteProduit(id: number|undefined){
    Swal.fire({
      title: 'Suppression',
      text: 'Voulez-vous vraiment vous supprimer le produit ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        this.produitService.deleteProduit(id ?? 0).subscribe({
          next: (data) => {
            console.log(data)
            Swal.fire(
              'Succès',
              'Suppression réussie !',
              'success'
            )
          }
        })
      }
    })
  }

  add() {
    const dialogRef = this.dialog.open(ProduitAddUpdateComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire("Enregistrement effectué !")
      }
    });
  }

  edit(data: Produit) {
    const dialogRef = this.dialog.open(ProduitAddUpdateComponent, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire("Enregistrement effectué !")
      }
    });
  }
}
