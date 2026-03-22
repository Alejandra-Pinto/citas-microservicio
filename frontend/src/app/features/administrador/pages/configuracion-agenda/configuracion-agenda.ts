import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../services/administrador';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-configuracion-agenda',
  templateUrl: './configuracion-agenda.html',
  styleUrls: ['./configuracion-agenda.scss']
})
export class ConfiguracionAgendaComponent implements OnInit {

  config = {
    horaInicio: '',
    horaFin: '',
    semanasDisponibles: 1,
    diasAtencion: [] as string[]
  };

  constructor(private adminService: AdministradorService) {}

  ngOnInit(): void {
    this.cargarConfiguracion();
  }

  cargarConfiguracion() {
    this.adminService.obtenerConfiguracion().subscribe((data: any) => {
      if (data) {
        this.config = {
          horaInicio: data.horaInicio || '',
          horaFin: data.horaFin || '',
          semanasDisponibles: data.semanasDisponibles || 1,
          diasAtencion: data.diasLaborales || [] // 👈 CLAVE
        };
      }
    });
  }

  guardar() {
    this.adminService.guardarConfiguracion(this.config)
      .subscribe(() => {
        alert('Configuración guardada');
      });
  }

  toggleDia(dia: string) {
    const diaUpper = dia.toUpperCase();

    const index = this.config.diasAtencion.indexOf(diaUpper);

    if (index >= 0) {
      this.config.diasAtencion.splice(index, 1);
    } else {
      this.config.diasAtencion.push(diaUpper);
    }

    console.log(this.config.diasAtencion); // 👈 DEBUG
  }
}
