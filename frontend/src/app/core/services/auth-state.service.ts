import { Injectable, signal, computed, inject } from '@angular/core'; // Añadimos inject
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  // Cambiamos la forma de inyectar para asegurar que el inyector esté listo
  private keycloak = inject(KeycloakService);
  private router = inject(Router);

  private _isLoggedIn = signal<boolean>(false);
  private _roles = signal<string[]>([]);
  // Nueva señal para los datos del usuario (Nombre, Email, etc.)
  private _userProfile = signal<KeycloakProfile | null>(null);

  public isLoggedIn = computed(() => this._isLoggedIn());
  public isAdmin = computed(() => this._roles().includes('ADMIN'));
  public isEspecialista = computed(() => this._roles().includes('ESPECIALISTA'));
  public isPaciente = computed(() => this._roles().includes('PACIENTE'));

  // Exponemos el perfil para el HTML
  public usuario = computed(() => this._userProfile());

  constructor() {
    this.init();
  }

  // Lógica para decidir la ruta según el rol
  public getRedirectUrl(): string {
    const roles = this._roles();
    if (roles.includes('PACIENTE')) return '/agendarUser';
    if (roles.includes('ESPECIALISTA')) return '/agendar';
    if (roles.includes('ADMIN')) return '/administrador';
    return '/home'; // Ruta por defecto
  }

  public async login() {
    const logged = this._isLoggedIn();
    const target = this.getRedirectUrl();

    if (!logged) {
      // Si no está logueado, Keycloak lo autentica y lo manda a su ruta
      await this.keycloak.login({
        redirectUri: window.location.origin + target,
      });
    } else {
      // Si ya está logueado, simplemente lo movemos internamente
      this.router.navigate([target]);
    }
  }

  private async init() {
    try {
      const logged = await this.keycloak.isLoggedIn();
      this._isLoggedIn.set(logged);

      if (logged) {
        this._roles.set(this.keycloak.getUserRoles());
        // Cargamos el perfil completo (nombre, apellido, username)
        const profile = await this.keycloak.loadUserProfile();
        this._userProfile.set(profile);
      }
    } catch (error) {
      console.error('Error inicializando AuthState:', error);
    }
  }

  public logout() {
    this.keycloak.logout(window.location.origin + '/home');
  }
}
