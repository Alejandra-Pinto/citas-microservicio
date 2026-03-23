import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horario-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horario-selector.html',
})
export class HorarioSelectorComponent {
  @Input() fecha: string = '';
  @Input() horaSeleccionada: string = '';
  @Input() horarios: any[] = [];

  @Output() fechaChange = new EventEmitter<string>();
  @Output() horaChange = new EventEmitter<string>();

  onFechaChange(nuevaFecha: string) {
    this.fechaChange.emit(nuevaFecha);
  }

  onHoraChange(nuevaHora: string) {
    this.horaChange.emit(nuevaHora);
  }

  convertirHora(hora: string): string {
    // Convierte "08:15 AM" → "08:15"
    const [time, modifier] = hora.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }
}
