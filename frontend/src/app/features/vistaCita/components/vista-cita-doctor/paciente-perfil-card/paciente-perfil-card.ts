import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paciente-perfil-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-perfil-card.html',
  styleUrls: ['./paciente-perfil-card.scss'],
})
export class PacientePerfilCard {
  // Usamos el tipo parcial para permitir que falten campos si aún no cargan (en caso de la foto del paciente)
  @Input() pacienteInfo?: any;
}
