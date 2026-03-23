import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../../../core/services/citas-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agendamiento',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agendamiento.html',
  styleUrl: './agendamiento.scss',
})
export class Agendamiento implements OnInit {
  especialistas: any[] = [];
  horarios: any[] = [];

  formData = {
    cedula: '',
    nombre: '',
    especialistaid: '',
    fecha: '',
    hora: '',
    tipo: '',
  };

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    console.log('AGENDAMIENTO CARGADO');
    this.cargarEspecialistas();
  }

  cargarEspecialistas() {
    this.citasService.getEspecialistas().subscribe((data) => {
      console.log('Datos recibidos del Back:', data);
      this.especialistas = data;
    });
  }

  pacienteEncontrado: any = null;

  buscarPaciente() {
    if (!this.formData.cedula) return;

    this.citasService.getPaciente(this.formData.cedula).subscribe({
      next: (data) => {
        if (data) {
          // Guardamos todo el objeto para usarlo en la tarjeta lateral
          this.pacienteEncontrado = data;

          // Esto es lo que ya tenías para el input del formulario
          this.formData.nombre = `${data.nombres} ${data.apellidos}`;

          console.log('Datos del paciente cargados:', this.pacienteEncontrado);
        } else {
          this.pacienteEncontrado = null;
          this.formData.nombre = '';
          alert('Paciente no registrado en Piedra Azul');
        }
      },
      error: () => {
        this.pacienteEncontrado = null;
        alert('Error al buscar los datos del paciente');
      },
    });
  }

  cargarDisponibilidad() {
    if (!this.formData.especialistaid || !this.formData.fecha) return;

    this.citasService
      .getDisponibilidad(this.formData.especialistaid, this.formData.fecha)
      .subscribe((data) => {
        this.horarios = data;
      });
  }

  agendar() {
    if (!this.validar()) return;

    // Concatenamos manualmente
    // Asumimos que formData.hora ya viene como "08:40"
    const fechaHoraStr = `${this.formData.fecha}T${this.formData.hora}:00`;

    const dto = {
      pacienteId: this.formData.cedula,
      especialistaId: this.formData.especialistaid.toString(), // Lo pasamos a String por si acaso
      fechaHora: fechaHoraStr,
      tipo: this.formData.tipo || 'CONTROL',
    };

    console.log('DTO Final a enviar:', dto);

    this.citasService.crearCita(dto).subscribe({
      next: () => alert('¡Cita agendada con éxito!'),
      error: (err) => console.error('Error del servidor:', err),
    });
  }

  validar(): boolean {
    if (!this.formData.cedula) return (alert('Cédula requerida'), false);
    if (!this.formData.especialistaid) return (alert('Seleccione especialista'), false);
    if (!this.formData.fecha) return (alert('Seleccione fecha'), false);
    if (!this.formData.hora) return (alert('Seleccione hora'), false);

    return true;
  }

  getEdad(): string {
    if (!this.pacienteEncontrado?.fechaNacimiento) return '--';

    const nacimiento = new Date(this.pacienteEncontrado.fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (hoy < new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate())) {
      edad--;
    }
    return `${edad} años`;
  }
}
