import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabla-citas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tabla-citas.html',
})
export class TablaCitas {
  @Input() citas: any[] = [];
}
