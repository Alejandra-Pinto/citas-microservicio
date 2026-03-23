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
}
