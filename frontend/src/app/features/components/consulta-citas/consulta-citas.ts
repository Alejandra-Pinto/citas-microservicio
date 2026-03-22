import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulta-citas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consulta-citas.html',
  styleUrl: './consulta-citas.scss'
})
export class ConsultaCitas {
  citas = signal([
    { id: 1, doctor: 'Dr. Sofia Mendez', fecha: '17 Mar, 2026', hora: '09:00 AM', estado: 'Confirmada' }
  ]);
}
