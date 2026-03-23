import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cita } from '../../../../core/models/cita.model';

@Component({
  selector: 'app-metricas-citas',
  standalone: true,
  templateUrl: './metricas-citas.html',
})
export class MetricasCitas {
  @Input() citas: Cita[] = [];
  // Emitimos el estado como string: 'TODAS', 'PROGRAMADA', 'FINALIZADA'
  @Output() filtrarEstado = new EventEmitter<string>();

  get pendientes(): number {
    return this.citas.filter(c => c.estado === 'PROGRAMADA').length;
  }

  get completadas(): number {
    return this.citas.filter(c => c.estado === 'FINALIZADA').length;
  }

  seleccionarFiltro(estado: string) {
    this.filtrarEstado.emit(estado);
  }
}