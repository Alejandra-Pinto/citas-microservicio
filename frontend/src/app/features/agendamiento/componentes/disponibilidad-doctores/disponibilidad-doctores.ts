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
      next: (citas: Cita[]) => {
        const conteoMap = new Map<string, number>();

        citas.forEach((cita) => {
          // Si el back no manda el nombre, usamos el ID temporalmente
          const nombreMostrar = cita.especialistaNombre || `ID: ${cita.especialistaId}`;
          const actual = conteoMap.get(nombreMostrar) || 0;
          conteoMap.set(nombreMostrar, actual + 1);
        });

        this.doctoresDisponibilidad = Array.from(conteoMap, ([nombre, total]) => ({
          nombre,
          citasAgendadas: total,
        })).sort((a, b) => b.citasAgendadas - a.citasAgendadas);
      },
    });
  }

  calcularPorcentaje(citas: number): number {
    return (citas / this.MAX_CITAS) * 100;
  }
}
