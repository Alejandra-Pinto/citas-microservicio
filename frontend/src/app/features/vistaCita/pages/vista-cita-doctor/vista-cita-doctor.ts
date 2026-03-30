import { Component } from '@angular/core';
import { Agendamiento } from '../../../agendamiento/pages/agendamiento/agendamiento';
import { AgendamientoInfoMedico } from '../../components/vista-cita-doctor/agendamiento-info-medico/agendamiento-info-medico';
import { AgendamientoInfoPanelNotas } from '../../components/vista-cita-doctor/agendamiento-info-panel-notas/agendamiento-info-panel-notas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vista-cita-doctor',
  imports: [AgendamientoInfoMedico, AgendamientoInfoPanelNotas],
  templateUrl: './vista-cita-doctor.html',
  styleUrl: './vista-cita-doctor.scss',
})
export class VistaCitaDoctor {
  // Aquí guardaremos la información que bajamos del servidor
  cita: any;
  paciente: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.cargarDatosCita(id);
  }

  cargarDatosCita(id: string | null) {
    // POR AHORA: Datos de prueba (Mock) para que veas el diseño funcional
    // LUEGO: Aquí harás this.citaService.getById(id).subscribe(...)
    this.cita = {
      id: id,
      estado: 'PROGRAMADA',
      tipo: 'Cardiología Clínica',
      fechaHora: new Date().toISOString(),
      duracion: 45,
      especialista: { nombre: 'Elena', apellido: 'Rodríguez', fotoUrl: 'assets/doc.png' },
    };

    this.paciente = {
      nombre: 'Mariana De la Rosa',
      documento: '12.345.678',
      genero: 'Femenino',
      edad: 34,
      tipoSangre: 'O+',
      ultimaVisita: '12 Oct 2023',
    };
  }

  onEstadoChanged(nuevoEstado: string) {
    console.log('Cambiando estado a:', nuevoEstado);
    this.cita.estado = nuevoEstado;
    // Aquí llamarías al backend para persistir el cambio
  }
}
