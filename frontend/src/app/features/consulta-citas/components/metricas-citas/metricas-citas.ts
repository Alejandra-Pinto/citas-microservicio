import { Component, Input } from '@angular/core';
import { Cita } from '../../../../core/models/cita.model';

@Component({
  selector: 'app-metricas-citas',
  standalone: true,
  templateUrl: './metricas-citas.html',
})
export class MetricasCitas {

  @Input() citas: Cita[] = [];

  get pendientes(): number {
    return this.citas.filter(c => c.estado === 'PENDIENTE').length;
  }

  get completadas(): number {
    return this.citas.filter(c => c.estado === 'COMPLETADA').length;
  }

}