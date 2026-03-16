import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asistente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asistente.html'
})
export class AsistenteComponent {
  pasoActual = signal(1);
  especialidadSeleccionada = signal('');

  seleccionarEspecialidad(nombre: string) {
    this.especialidadSeleccionada.set(nombre);
    this.pasoActual.set(2); // Avanza al siguiente paso del prototipo
  }
}
