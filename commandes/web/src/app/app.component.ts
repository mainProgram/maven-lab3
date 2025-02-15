import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    CommonModule,
    RouterOutlet,
    MatIconModule,
    RouterModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatAnchor
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web';
}
