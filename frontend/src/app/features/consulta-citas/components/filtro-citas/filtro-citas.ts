import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EspecialistaService } from '../../../../core/services/especialista.service';

@Component({
  selector: 'app-filtro-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtro-citas.html',
})
export class FiltroCitas {

  especialistas: any[] = []; // Aquí guardaremos los médicos del back
  especialistaId = '';
  fecha = '';

  @Output() buscar = new EventEmitter<any>();

  constructor(private especialistaService: EspecialistaService) {}

  ngOnInit() {
    this.cargarEspecialistas();
  }

  cargarEspecialistas() {
    this.especialistaService.listarEspecialistas().subscribe({
      next: (data) => (this.especialistas = data),
      error: (err) => console.error('Error cargando especialistas', err)
    });
  }

  buscarCitas() {
    this.buscar.emit({
      especialistaId: this.especialistaId,
      fecha: this.fecha,
    });
  }
}