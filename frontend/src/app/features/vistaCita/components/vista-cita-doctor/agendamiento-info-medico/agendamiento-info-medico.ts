import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita } from '../../../../../core/models/cita.model';

@Component({
  selector: 'app-agendamiento-info-medico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendamiento-info-medico.html',
  styleUrls: ['./agendamiento-info-medico.scss'],
})
export class AgendamientoInfoMedico {
  @Input() citaInfo?: Cita;

  // Calculamos el rango horario dinámicamente
  get rangoHorario(): string {
    if (!this.citaInfo?.fechaHora) return '';

    const inicio = new Date(this.citaInfo.fechaHora);
    const fin = new Date(inicio.getTime() + (this.citaInfo.duracion || 30) * 60000);

    const opciones: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    return `${inicio.toLocaleTimeString([], opciones)} - ${fin.toLocaleTimeString([], opciones)}`;
  }
}
