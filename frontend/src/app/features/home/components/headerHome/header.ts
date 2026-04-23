import { Component, inject, signal } from '@angular/core'; // Añadimos signal
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Añadimos para las clases dinámicas

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule], // Añadimos CommonModule
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public authService = inject(AuthStateService);

  // Signal para el menú hamburguesa
  public isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
  private router = inject(Router); // Asegúrate de tener inyectado el Router

  handleCtaClick() {
    if (!this.authService.isLoggedIn()) {
      // Si no está logueado, vamos a la página de login personalizada
      this.router.navigate(['/login']);
    } else {
      // Si ya está dentro, usamos la lógica de rutas de tu servicio
      const target = this.authService.getRedirectUrl();
      this.router.navigate([target]);
    }
  }
}