import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../../../core/services/citas-service';
import { Cita } from '../../../../core/models/cita.model';

@Component({
  selector: 'app-disponibilidad-doctores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './disponibilidad-doctores.html',
})
export class DisponibilidadDoctores implements OnInit {
  doctoresDisponibilidad: any[] = [];
  readonly MAX_CITAS = 50;

  constructor(private citasService: CitasService) {}

  ngOnInit() {
    this.obtenerYProcesarCitas();
  }

  obtenerYProcesarCitas() {
    this.citasService.getCitasParaDashboard().subscribe({
      next: (citas: any[]) => {
        const conteoMap = new Map<string, number>();

        citas.forEach((cita) => {
          // Extraemos el nombre desde la relación 'especialista' que activamos en el back
          const nombreDoc = cita.especialista?.nombre || cita.especialista?.apellido || 'Médico';
          const actual = conteoMap.get(nombreDoc) || 0;
          conteoMap.set(nombreDoc, actual + 1);
        });

        this.doctoresDisponibilidad = Array.from(conteoMap, ([nombre, total]) => ({
          nombre,
          citasAgendadas: total,
        })).sort((a, b) => b.citasAgendadas - a.citasAgendadas);
      },
    });
  }

  getBarColor(citas: number): string {
    const porcentaje = (citas / this.MAX_CITAS) * 100;

    if (porcentaje >= 80) return 'bg-red-500'; // Crítico (Más de 40 citas)
    if (porcentaje >= 50) return 'bg-amber-500'; // Medio (25-40 citas)
    return 'bg-emerald-500'; // Bajo (Menos de 25 citas)
  }

  calcularPorcentaje(citas: number): number {
    return (citas / this.MAX_CITAS) * 100;
  }
}
