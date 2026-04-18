import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../../../core/services/auth-state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public authService = inject(AuthStateService);

  login() {
    this.authService.login();
  }
}
