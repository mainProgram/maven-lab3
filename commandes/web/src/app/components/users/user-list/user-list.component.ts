import {Component, inject} from '@angular/core';
import {LoaderComponent} from "../../loader/loader.component";
import {MatIcon} from "@angular/material/icon";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {LoaderService} from "../../../services/loader.service";
import {MatDialog} from "@angular/material/dialog";
import {finalize, take} from "rxjs";
import Swal from "sweetalert2";
import {AppUserService} from "../../../services/app-user.service";
import {AppRoleService} from "../../../services/app-role.service";
import {UserAddUpdateComponent} from "../user-add-update/user-add-update.component";
import {AppUser} from "../../../models/app-user.model";

@Component({
  selector: 'app-user-list',
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
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  router = inject(Router);
  appUserService = inject(AppUserService);
  appRoleService = inject(AppRoleService);
  loaderService = inject(LoaderService);
  loading = inject(LoaderService).loading;

  constructor(
    public dialog: MatDialog,
  ) {
    this.loaderService.showLoader()
    this.appUserService.fetchAppUsers().pipe(
      take(1),
      finalize(() => this.loaderService.hideLoader())
    ).subscribe();
  }

  get users() {
    return this.appUserService.resources;
  }

  deleteAppUser(id: number|undefined){
    Swal.fire({
      title: 'Suppression',
      text: 'Voulez-vous vraiment vous supprimer l\'utilisateur ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        this.appUserService.deleteAppUser(id ?? 0).subscribe({
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
    const dialogRef = this.dialog.open(UserAddUpdateComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire("Enregistrement effectué !")
      }
    });
  }

  edit(data: AppUser) {
    const dialogRef = this.dialog.open(UserAddUpdateComponent, {
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
