import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EspecialistaService } from '../../../../core/services/especialista.service';

@Component({
  selector: 'app-configuracion-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion-agenda.html',
})
export class ConfiguracionAdmin implements OnInit {
  especialistas: any[] = [];
  espExpandedId: string | null = null;
  
  // Configuración de semanas
  semanasGlobal = 4;
  
  // Listas maestras
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  intervalos = [5, 10, 15, 20, 25, 30, 40, 50];

  constructor(private especialistaService: EspecialistaService) {}

  ngOnInit() {
    this.especialistaService.listarEspecialistas().subscribe(data => {
      this.especialistas = data;
    });
  }

  toggleEspecialista(id: string) {
    this.espExpandedId = this.espExpandedId === id ? null : id;
  }

  // Métodos para el contador de semanas (más intuitivo para mayores)
  ajustarSemanas(valor: number) {
    if (this.semanasGlobal + valor >= 1 && this.semanasGlobal + valor <= 52) {
      this.semanasGlobal += valor;
    }
  }

  guardarConfiguracionGlobal() {
    // Aquí iría la lógica para enviar la configuración global al backend
    console.log('Configuración global guardada:', {
      semanasGlobal: this.semanasGlobal,
      especialistas: this.especialistas
    });
  }
}