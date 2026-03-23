import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtro-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtro-citas.html',
})
export class FiltroCitas {

  especialistaId = '';
  fecha = '';

  @Output() buscar = new EventEmitter<any>();

  buscarCitas() {
    this.buscar.emit({
      especialistaId: this.especialistaId,
      fecha: this.fecha,
    });
  }
}