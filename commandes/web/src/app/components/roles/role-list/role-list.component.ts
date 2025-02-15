import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {LoaderService} from "../../../services/loader.service";
import {MatDialog} from "@angular/material/dialog";
import {finalize, take} from "rxjs";
import Swal from "sweetalert2";
import {RoleAddUpdateComponent} from "../role-add-update/role-add-update.component";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {LoaderComponent} from "../../loader/loader.component";
import {AppRoleService} from "../../../services/app-role.service";
import {AppRoles} from "../../../models/app-roles.model";
import {RolePipePipe} from "../../../shared/pipes/role-pipe.pipe";

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [MatCardHeader,
    NgForOf,
    MatIcon,
    MatCardTitle,
    MatCardActions,
    MatCard,
    MatCardContent,
    RouterLink,
    LoaderComponent,
    NgIf, RolePipePipe
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent {

  router = inject(Router);
  roleService = inject(AppRoleService);
  loaderService = inject(LoaderService);
  loading = inject(LoaderService).loading;

  constructor(
    public dialog: MatDialog,
  ) {
    this.loaderService.showLoader()
    this.roleService.fetchAppRoles().pipe(
      take(1),
      finalize(() => this.loaderService.hideLoader())
    ).subscribe();
  }

  get roles() {
    return this.roleService.resources;
  }

  deleteRole(id: number|undefined){
    Swal.fire({
      title: 'Suppression',
      text: 'Voulez-vous vraiment vous supprimer le rôle ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.value) {
        this.roleService.deleteAppRole(id ?? 0).subscribe({
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
    const dialogRef = this.dialog.open(RoleAddUpdateComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Swal.fire("Enregistrement effectué !")
      }
    });
  }

  edit(data: AppRoles) {
    const dialogRef = this.dialog.open(RoleAddUpdateComponent, {
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
