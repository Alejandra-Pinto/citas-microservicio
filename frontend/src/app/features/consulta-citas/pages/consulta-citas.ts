import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../../core/services/citas-service';
import { FiltroCitas } from '../components/filtro-citas/filtro-citas';
import { TablaCitas } from '../components/tabla-citas/tabla-citas';
import { MetricasCitas } from '../components/metricas-citas/metricas-citas';
import { Cita } from '../../../core/models/cita.model';
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-consulta-citas',
  imports: [CommonModule, FiltroCitas, TablaCitas, MetricasCitas, RouterLink],
  templateUrl: './consulta-citas.html',
})
export class ConsultaCitas {
  citas: Cita[] = [];
  estadoSeleccionado = 'TODAS'; // Nuevo: rastrea qué filtro de métrica está activo
  loading = false;
  error = '';

  constructor(private citasService: CitasService) {}

  // Esta función calcula qué enviar a la tabla basado en el clic de la métrica
  get citasFiltradas(): Cita[] {
    if (this.estadoSeleccionado === 'TODAS') {
      return this.citas;
    }
    return this.citas.filter(c => c.estado === this.estadoSeleccionado);
  }

  onFiltrarPorMetrica(estado: string) {
    this.estadoSeleccionado = estado;
  }

  onBuscar(filtro: { especialistaId: string; fecha: string }) {
    this.loading = true;
    this.error = '';
    this.estadoSeleccionado = 'TODAS'; // Resetear filtro al buscar de nuevo

    this.citasService.listarCitas(filtro.especialistaId, filtro.fecha).subscribe({
      next: (data) => {
        this.citas = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar citas';
        this.loading = false;
      },
    });
  }
}