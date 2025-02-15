import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCardTitle,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
