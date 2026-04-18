import { Component, inject, signal } from '@angular/core'; // Añadimos signal
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { RouterLink } from '@angular/router';
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
}