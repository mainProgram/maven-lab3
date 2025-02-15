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
import {take} from "rxjs";
import {AppRoleService} from "../../../services/app-role.service";
import {AppUserService} from "../../../services/app-user.service";
import {AppUser} from "../../../models/app-user.model";
import {RolePipePipe} from "../../../shared/pipes/role-pipe.pipe";

@Component({
  selector: 'app-user-add-update',
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
  templateUrl: './user-add-update.component.html',
  styleUrl: './user-add-update.component.css'
})
export class UserAddUpdateComponent implements OnInit{
  form!: FormGroup;
  errorMessage: string = "";
  isLoading= false

  constructor(
    private _userService: AppUserService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserAddUpdateComponent>,
  ) {
    this._roleService.fetchAppRoles().pipe(
      take(1),
    ).subscribe();
  }

  _roleService = inject(AppRoleService);

  ngOnInit(): void {
    this.initForm()
    if(this.data?.id)
      this.populateForm()
  }

  initForm(){
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      appRoleEntities: ['', Validators.required],
    });
  }

  populateForm(){
    this.form = this.fb.group({
      nom: [this.data?.nom, Validators.required],
      prenom: [this.data?.prenom, Validators.required],
      email: [this.data?.email, Validators.required],
      password: [this.data?.password, Validators.required],
      appRoleEntities: [this.data?.appRoleEntities?.[0].id, Validators.required],
    });
  }

  get roles() {
    return this._roleService.resources;
  }

  onSubmit(){
    this.isLoading = true
    this.form.get("appRoleEntities")?.setValue(this.getRole(this.form.get("appRoleEntities")?.value))
    if(this.data?.id) {
      this._userService.updateAppUser(this.data?.id, this.form.value).subscribe({
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
      let body = this.form.value as AppUser
      this._userService.addAppUser(body).subscribe({
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

  getRole(id: any) {
    let role = this.roles().find(value => value.id == id)
    return [role]
  }
}

