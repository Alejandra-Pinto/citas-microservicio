import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EspecialistaService } from '../../../../core/services/especialista.service';
import { AdminService } from '../../../../core/services/admin.service';

@Component({
  selector: 'app-configuracion-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion-agenda.html',
})
export class ConfiguracionAdmin implements OnInit {
  especialistas: any[] = [];
  espExpandedId: string | null = null;

  semanasGlobal = 4;

  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  intervalos = [5, 10, 15, 20, 25, 30, 40, 50];

  constructor(
    private especialistaService: EspecialistaService,
    private adminService: AdminService
  ) {}

  ngOnInit() {

    // 🔥 Inicializar especialistas con config (CLAVE)
    this.especialistaService.listarEspecialistas().subscribe((data: any[]) => {
      this.especialistas = data.map(esp => ({
        ...esp,
        config: {
          intervaloAtencion: 30,
          horarioAtencion: {
            horaInicio: '',
            horaFin: '',
            diaSemana: []
          }
        }
      }));
    });

    this.adminService.obtenerConfiguracionGlobal().subscribe((data: any) => {
      if (data) {
        this.semanasGlobal = data.ventanaHabilitacionSemanas;
      }
    });
  }

  toggleEspecialista(id: string) {
    this.espExpandedId = this.espExpandedId === id ? null : id;

    if (this.espExpandedId) {
      this.adminService.obtenerAgendaEspecialista(id)
        .subscribe((data: any) => {
          const esp = this.especialistas.find(e => e.id === id);

          if (!esp) return;

          // 🔥 Asegurar estructura SIEMPRE
          if (!esp.config) {
            esp.config = {
              intervaloAtencion: 30,
              horarioAtencion: {
                horaInicio: '',
                horaFin: '',
                diaSemana: []
              }
            };
          }

          // 🔥 Si backend devuelve datos, los usamos
          if (data) {
            console.log('CONFIG ESPECIALISTA:', data);
            esp.config = {
              intervaloAtencion: data.intervaloAtencion ?? 30,
              horarioAtencion: {
                horaInicio: data.horarioAtencion?.horaInicio ?? '',
                horaFin: data.horarioAtencion?.horaFin ?? '',
                diaSemana: data.horarioAtencion?.diaSemana ?? []
              }
            };
          }
        });
    }
  }

  ajustarSemanas(valor: number) {
    if (this.semanasGlobal + valor >= 1 && this.semanasGlobal + valor <= 52) {
      this.semanasGlobal += valor;
    }
  }

  guardarConfiguracionGlobal() {
    this.adminService.actualizarConfiguracionGlobal({
      ventanaHabilitacionSemanas: this.semanasGlobal
    }).subscribe(() => {
      alert('Configuración global actualizada');
    });
  }

  guardarEspecialista(esp: any) {
    if (!esp.config || !esp.config.horarioAtencion) {
      alert('Falta configuración');
      return;
    }

    const config = esp.config;

    // 🔴 VALIDACIONES FRONT (evitan 400)
    if (!config.intervaloAtencion || config.intervaloAtencion < 5) {
      alert('Intervalo inválido (mínimo 5)');
      return;
    }

    if (!config.horarioAtencion.horaInicio || !config.horarioAtencion.horaFin) {
      alert('Debes seleccionar horas');
      return;
    }

    if (!config.horarioAtencion.diaSemana || config.horarioAtencion.diaSemana.length === 0) {
      alert('Selecciona al menos un día');
      return;
    }

    const payload = {
      intervaloAtencion: Number(config.intervaloAtencion), // 🔥 FORZAR NUMBER
      horarioAtencion: {
        horaInicio: config.horarioAtencion.horaInicio,
        horaFin: config.horarioAtencion.horaFin,
        diaSemana: config.horarioAtencion.diaSemana
      }
    };

    console.log('ENVIANDO:', JSON.stringify(payload, null, 2));

    this.adminService.actualizarAgendaEspecialista(esp.id, payload)
      .subscribe({
        next: () => {
          alert('Configuración guardada');
        },
        error: (err) => {
          console.error('BACKEND:', err);
          console.error('DETALLE:', err.error); // 🔥 AQUÍ SALE EL ERROR REAL
          alert('Error del backend (revisa consola)');
        }
      });
  }

  toggleDia(esp: any, dia: string) {

    // 🔥 Protección contra undefined
    if (!esp.config) {
      esp.config = {
        intervaloAtencion: 30,
        horarioAtencion: {
          horaInicio: '',
          horaFin: '',
          diaSemana: []
        }
      };
    }

    if (!esp.config.horarioAtencion) {
      esp.config.horarioAtencion = {
        horaInicio: '',
        horaFin: '',
        diaSemana: []
      };
    }

    if (!esp.config.horarioAtencion.diaSemana) {
      esp.config.horarioAtencion.diaSemana = [];
    }

    const dias = esp.config.horarioAtencion.diaSemana;

    if (dias.includes(dia)) {
      esp.config.horarioAtencion.diaSemana =
        dias.filter((d: string) => d !== dia);
    } else {
      dias.push(dia);
    }
  }
}
