import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../agendamiento/citasService/citas-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agendamiento',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './agendamiento.html',
  styleUrl: './agendamiento.scss',
})
export class Agendamiento implements OnInit{
  especialistas: any[] = [];
  horarios: any[] = [];

  formData = {
  cedula: '',
  nombre: '',
  especialista: '',
  fecha: '',
  hora: '',
  tipo: ''
  };

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    console.log('AGENDAMIENTO CARGADO');
    this.cargarEspecialistas();
  }

  cargarEspecialistas() {
    this.citasService.getEspecialistas().subscribe(data => {
      this.especialistas = data;
    });
  }

  buscarPaciente() {
    if (!this.formData.cedula) return;

    this.citasService.getPaciente(this.formData.cedula).subscribe(data => {
      this.formData.nombre = data.nombres + ' ' + data.apellidos;
    });
  }

  cargarDisponibilidad() {
    if (!this.formData.especialista || !this.formData.fecha) return;

    this.citasService
      .getDisponibilidad(this.formData.especialista, this.formData.fecha)
      .subscribe(data => {
        this.horarios = data;
      });
  }

  agendar() {
    if (!this.validar()) return;

    // 🔥 Construir fechaHora correctamente
    const fechaHora = new Date(
      `${this.formData.fecha}T${this.formData.hora}`
    ).toISOString();

    const dto = {
      pacienteId: this.formData.cedula,
      especialistaId: this.formData.especialista,
      fechaHora: fechaHora,
      tipo: this.formData.tipo || 'CONTROL' // o PRIMERA
    };

    console.log('DTO enviado:', dto);

    this.citasService.crearCita(dto).subscribe({
      next: () => {
        alert('Cita creada correctamente');
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear cita');
      }
    });
  }

  validar(): boolean {
    if (!this.formData.cedula) return alert('Cédula requerida'), false;
    if (!this.formData.especialista) return alert('Seleccione especialista'), false;
    if (!this.formData.fecha) return alert('Seleccione fecha'), false;
    if (!this.formData.hora) return alert('Seleccione hora'), false;

    return true;
  }


}
