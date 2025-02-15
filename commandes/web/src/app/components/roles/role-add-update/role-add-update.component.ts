import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatSelect} from "@angular/material/select";
import {MatToolbar} from "@angular/material/toolbar";
import {NgForOf, NgIf} from "@angular/common";
import {RolePipePipe} from "../../../shared/pipes/role-pipe.pipe";
import {AppRoleService} from "../../../services/app-role.service";
import {take} from "rxjs";
import {AppRoles} from "../../../models/app-roles.model";

@Component({
  selector: 'app-role-add-update',
  standalone: true,
    imports: [
        FormsModule,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatProgressSpinner,
        MatSelect,
        MatToolbar,
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        RolePipePipe
    ],
  templateUrl: './role-add-update.component.html',
  styleUrl: './role-add-update.component.css'
})
export class RoleAddUpdateComponent implements OnInit{
  form!: FormGroup;
  errorMessage: string = "";
  isLoading= false

  constructor(
    private _roleService: AppRoleService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RoleAddUpdateComponent>,
  ) {
    this._roleService.fetchAppRoles().pipe(
      take(1),
    ).subscribe();
  }

  ngOnInit(): void {
    this.initForm()
    if(this.data?.id)
      this.populateForm()
  }

  initForm(){
    this.form = this.fb.group({
      nom: ['', Validators.required],
    });
  }

  populateForm(){
    this.form = this.fb.group({
      nom: [this.data?.nom, Validators.required],
    });
  }

  get roles() {
    return this._roleService.resources;
  }

  onSubmit(){
    this.isLoading = true
    if(this.data?.id) {
      this._roleService.updateAppRole(this.data?.id, this.form.value).subscribe({
        next: value => {
          console.log(value)
          this.isLoading = false
          this.errorMessage = "";
          this.dialogRef.close(true)
        },
        error: (error) => {
          console.log(error)
          this.isLoading = false
          this.errorMessage = error?.error?.error;
        }
      })
    }
    else{
      let body = this.form.value as AppRoles
      this._roleService.addAppRole(body).subscribe({
        next: value => {
          this.errorMessage = "";
          this.isLoading = false
          console.log(value)
          this.dialogRef.close(true)
        },
        error: (error) => {
          console.log(error)
          this.isLoading = false
          this.errorMessage = error?.error?.error;
        }
      })
    }
  }

}
