import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cita } from '../../../../../core/models/cita.model';

@Component({
  selector: 'app-agendamiento-info-panel-notas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamiento-info-panel-notas.html',
  styleUrls: ['./agendamiento-info-panel-notas.scss'],
})
export class AgendamientoInfoPanelNotas {
  @Input() citaInfo?: Cita;

  // Lista de etiquetas dinámica
  tags: string[] = ['#consulta_general', '#seguimiento'];
  nuevoTag: string = '';

  agregarTag() {
    if (this.nuevoTag.trim()) {
      const tag = this.nuevoTag.startsWith('#') ? this.nuevoTag : `#${this.nuevoTag}`;
      this.tags.push(tag);
      this.nuevoTag = '';
    }
  }

  eliminarTag(index: number) {
    this.tags.splice(index, 1);
  }
}
