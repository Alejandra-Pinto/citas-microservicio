import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-especialista-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './especialista-selector.html',
})
export class EspecialistaSelectorComponent {
  @Input() especialistas: any[] = [];
  @Input() seleccionadoId: any;

  // Evento que notificará al padre cuando cambie el especialista
  @Output() cambioEspecialista = new EventEmitter<number>();

  onSeleccion(id: number) {
    this.cambioEspecialista.emit(id);
  }
}
