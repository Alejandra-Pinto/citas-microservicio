import { Injectable, signal, computed, inject } from '@angular/core'; // Añadimos inject
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  // Cambiamos la forma de inyectar para asegurar que el inyector esté listo
  private keycloak = inject(KeycloakService);

  private _isLoggedIn = signal<boolean>(false);
  private _roles = signal<string[]>([]);
  
  public isLoggedIn = computed(() => this._isLoggedIn());
  public isAdmin = computed(() => this._roles().includes('ADMIN'));
  public isEspecialista = computed(() => this._roles().includes('ESPECIALISTA'));

  constructor() {
    this.init();
  }

  private async init() {
    try {
      const logged = await this.keycloak.isLoggedIn();
      this._isLoggedIn.set(logged);
      if (logged) {
        this._roles.set(this.keycloak.getUserRoles());
      }
    } catch (error) {
      console.error('Error inicializando AuthState:', error);
    }
  }

  public async login() {
    await this.keycloak.login({
      redirectUri: window.location.origin + '/agendar',
    });
  }

  public logout() {
    this.keycloak.logout(window.location.origin);
  }
}