import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Agendamiento {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/agendamiento';

  crearCita(datosCita: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/citas/manual`, datosCita);
  }

  // Este lo usaremos para el asistente de agendamiento
  obtenerDisponibilidad(especialidad: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/disponibilidad?especialidad=${especialidad}`);
  }
}
