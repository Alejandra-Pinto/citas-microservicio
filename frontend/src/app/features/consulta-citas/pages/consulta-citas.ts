import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../../core/services/citas-service';
import { FiltroCitas } from '../components/filtro-citas/filtro-citas';
import { TablaCitas } from '../components/tabla-citas/tabla-citas';
import { MetricasCitas } from '../components/metricas-citas/metricas-citas';
import { Cita } from '../../../core/models/cita.model';
import { RouterLink } from "@angular/router";
import { PacienteService } from '../../../core/services/paciente.service';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-consulta-citas',
  imports: [CommonModule, FiltroCitas, TablaCitas, MetricasCitas, RouterLink],
  templateUrl: './consulta-citas.html',
})
export class ConsultaCitas {
  citas: any[] = []; // Cambiado a any[] temporalmente para aceptar la propiedad pacienteNombre
  estadoSeleccionado = 'TODAS';
  loading = false;
  exporting = false;
  error = '';
  fechaActual = new Date();
  ultimoFiltro: { especialistaId: string; fecha: string } | null = null;

  // Inyectamos ambos servicios
  constructor(
    private citasService: CitasService,
    private pacienteService: PacienteService
  ) {}
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

    this.citasService.listarCitas(filtro.especialistaId, filtro.fecha)
      .pipe(
        switchMap(citasBusqueda => {
          if (citasBusqueda.length === 0) return of([]);

          // Por cada cita, creamos una petición al servicio de pacientes
          const peticionesEnriquecidas = citasBusqueda.map(cita =>
            this.pacienteService.getPaciente(cita.pacienteId).pipe(
              map(paciente => ({
                ...cita,
                pacienteNombre: `${paciente.nombres} ${paciente.apellidos}` // Ajusta según tu modelo de paciente
              })),
              // En caso de que un paciente falle, devolvemos la cita con "Desconocido"
              // para no romper toda la lista
              catchError(() => of({ ...cita, pacienteNombre: 'Paciente no encontrado' }))
            )
          );
          return forkJoin(peticionesEnriquecidas);
        })
      )
      .subscribe({
        next: (data) => {
          this.citas = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Error al cargar citas o datos de pacientes';
          this.loading = false;
          console.error(err);
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