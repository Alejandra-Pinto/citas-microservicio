import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private api = 'http://localhost:3000/administrador';

  constructor(private http: HttpClient) {}

  // GLOBAL
  obtenerConfiguracionGlobal() {
    return this.http.get(`${this.api}/configuracion-global`);
  }

  actualizarConfiguracionGlobal(data: any) {
    return this.http.patch(`${this.api}/configuracion-global`, data);
  }

  // ESPECIALISTA
  obtenerAgendaEspecialista(id: string) {
    return this.http.get(`${this.api}/especialista/${id}/agenda`);
  }

  actualizarAgendaEspecialista(id: string, data: any) {
    return this.http.patch(`${this.api}/especialista/${id}/configurar-agenda`, data);
  }
}
