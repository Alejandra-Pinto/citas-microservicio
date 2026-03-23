import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-actions.html',
})
export class FormActionsComponent {
  // Recibe si el formulario está incompleto
  @Input() disabled: boolean = false;
  // Para mostrar un spinner si quieres luego
  @Input() loading: boolean = false;

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirmar() {
    if (!this.disabled) {
      this.onConfirm.emit();
    }
  }
}
