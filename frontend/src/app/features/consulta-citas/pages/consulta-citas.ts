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
  estadoSeleccionado = 'TODAS';
  loading = false;
  exporting = false; // Estado para los botones de descarga
  error = '';
  fechaActual = new Date();
  
  // Guardamos el último filtro para que la exportación sea coherente
  ultimoFiltro: { especialistaId: string; fecha: string } | null = null;

  constructor(private citasService: CitasService) {}

  get fechaFormateada(): string {
    return this.fechaActual.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

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
    this.ultimoFiltro = filtro; 
    this.loading = true;
    this.error = '';
    this.estadoSeleccionado = 'TODAS';

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

  onExportar(formato: 'pdf' | 'excel') {
    if (!this.ultimoFiltro) return;

    this.exporting = true;
    const { especialistaId, fecha } = this.ultimoFiltro;

    this.citasService.exportarReporte(especialistaId, fecha, formato).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const extension = formato === 'excel' ? 'xlsx' : 'pdf';
        a.download = `Reporte_PiedraAzul_${fecha}.${extension}`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.exporting = false;
      },
      error: () => {
        this.error = 'No se pudo generar el reporte';
        this.exporting = false;
      }
    });
  }
}