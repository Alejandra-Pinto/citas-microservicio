import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consulta-citas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './consulta-citas.html',
  styleUrl: './consulta-citas.scss',
})
export class ConsultaCitas {}
