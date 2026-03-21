import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-asistente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './asistente.html',
  styleUrl: './asistente.scss'
})
export class AsistenteComponent {
  // Estado del flujo
  pasoActual = signal(1);

  // Datos seleccionados
  doctorSeleccionado = signal<any>(null);
  fechaSeleccionada = signal<string>('13'); // Por defecto en tu diseño era '13'
  horaSeleccionada = signal<string>('');

  // Listado de doctores (Luego esto vendrá de tu servicio/backend)
  doctores = [
    {
      id: 1,
      nombre: 'Dr. Sofia Mendez',
      especialidad: 'Cardiología',
      experiencia: '12 años',
      rating: '4.9',
      reviews: '120',
      foto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&h=150&auto=format&fit=crop'
    },
    {
      id: 2,
      nombre: 'Dr. Marcus Chen',
      especialidad: 'Dermatología',
      experiencia: '8 años',
      rating: '4.8',
      reviews: '85',
      foto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&h=150&auto=format&fit=crop'
    }
  ];

  // Horarios disponibles
  horarios = ['09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '11:30 AM'];

  // Métodos de interacción
  seleccionarDoctor(doctor: any) {
    this.doctorSeleccionado.set(doctor);
  }

  seleccionarFecha(dia: string) {
    this.fechaSeleccionada.set(dia);
  }

  seleccionarHora(hora: string) {
    this.horaSeleccionada.set(hora);
  }

  confirmarCita() {
    if (this.doctorSeleccionado() && this.horaSeleccionada()) {
      const resumen = {
        doctor: this.doctorSeleccionado().nombre,
        fecha: `${this.fechaSeleccionada()} de Marzo`,
        hora: this.horaSeleccionada()
      };
      console.log('Cita enviada al backend:', resumen);
      alert(`¡Cita confirmada con ${resumen.doctor}!`);
      // Aquí podrías usar el Router para navegar a "mis-citas"
    } else {
      alert('Por favor selecciona un doctor y un horario');
    }
  }
}
