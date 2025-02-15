import {Component, Input, input} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-loader',
  imports: [
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './loader.component.html',
  standalone: true,
  styleUrl: './loader.component.sass'
})
export class LoaderComponent {
  @Input() loading!: boolean;
}
