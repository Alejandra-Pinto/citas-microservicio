import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paciente-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paciente-resumen-component.html',
})
export class PacienteResumenComponent {
  // El padre le pasará el objeto aquí
  @Input() paciente: any = null;

  // Movimos la lógica de la edad aquí para que el padre esté más limpio
  getEdad(): string {
    if (!this.paciente?.fechaNacimiento) return '--';
    const nacimiento = new Date(this.paciente.fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return `${edad} años`;
  }
}
