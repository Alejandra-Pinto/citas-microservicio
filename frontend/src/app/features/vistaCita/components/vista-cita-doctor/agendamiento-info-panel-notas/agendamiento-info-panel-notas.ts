import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agendamiento-info-panel-notas',
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamiento-info-panel-notas.html',
  styleUrl: './agendamiento-info-panel-notas.scss',
})
export class AgendamientoInfoPanelNotas {
  @Input() notas: string = '';
  @Input() tags: string[] = ['#control_mensual', '#seguimiento']; // Tags iniciales por defecto

  nuevoTag: string = '';

  agregarTag() {
    if (this.nuevoTag) {
      const tagFormat = this.nuevoTag.startsWith('#') ? this.nuevoTag : `#${this.nuevoTag}`;
      this.tags.push(tagFormat);
      this.nuevoTag = '';
    }
  }

  eliminarTag(index: number) {
    this.tags.splice(index, 1);
  }

  guardarNotas() {
    console.log('Notas guardadas:', this.notas);
    console.log('Etiquetas:', this.tags);
    // Aquí llamarías a tu servicio para actualizar la cita en el backend
  }
}
