import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-citas.html',
})
export class TablaCitas {
  @Input() citas: any[] = [];
}