import {Component, inject, Inject, OnInit} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {Produit} from "../../../models/produit.model";
import {ProduitService} from "../../../services/produit.service";
import {MatToolbar} from "@angular/material/toolbar";
import {NgForOf, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {AppUserService} from "../../../services/app-user.service";
import {take} from "rxjs";
import {LoaderComponent} from "../../loader/loader.component";

@Component({
  selector: 'app-produit-add-update',
  standalone: true,
  imports: [
    MatProgressSpinner,
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatError,
    MatToolbar,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    MatSelect,
    MatOption,
    LoaderComponent
  ],
  templateUrl: './produit-add-update.component.html',
  styleUrl: './produit-add-update.component.css'
})
export class ProduitAddUpdateComponent implements OnInit{
  form!: FormGroup;
  errorMessage: string = "";
  isLoading= false

  constructor(
    private _produitService: ProduitService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProduitAddUpdateComponent>,
  ) {
    this.userService.fetchAppUsers().pipe(
      take(1),
    ).subscribe();
  }

  userService = inject(AppUserService);

  ngOnInit(): void {
    this.initForm()
    if(this.data?.id)
      this.populateForm()
  }

  initForm(){
    this.form = this.fb.group({
      nom: ['', Validators.required],
      qtStock: ['', Validators.required],
      appUserId: ['', Validators.required],
    });
  }

  populateForm(){
    this.form = this.fb.group({
      nom: [this.data?.nom, Validators.required],
      qtStock: [this.data?.qtStock, Validators.required],
      appUserId: [this.data?.appUserId, Validators.required],
    });
  }

  get users() {
    return this.userService.resources;
  }

  onSubmit(){
    this.isLoading = true
    if(this.data?.id) {
      this._produitService.updateProduit(this.data?.id, this.form.value).subscribe({
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
      let body = this.form.value as Produit
      this._produitService.addProduit(body).subscribe({
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
