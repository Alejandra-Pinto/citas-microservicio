import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../../../../core/services/auth-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginPage implements OnInit {
  public authService = inject(AuthStateService);
  cargando = signal(true); // Empezamos cargando

  async ngOnInit() {
    // Apenas cargue el componente, disparamos el flujo
    await this.iniciarFlujoLogin();
  }

  async iniciarFlujoLogin() {
    try {
      await this.authService.login();
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.cargando.set(false);
    }
  }
}