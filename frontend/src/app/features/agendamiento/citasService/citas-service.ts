import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private api = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Especialistas
  getEspecialistas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/especialistas`);
  }

  //Buscar paciente
  getPaciente(documento: string): Observable<any> {
    return this.http.get(`${this.api}/pacientes/${documento}`);
  }

  //Disponibilidad
  getDisponibilidad(especialistaId: string, fecha: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.api}/citas/disponibilidad?especialistaId=${especialistaId}&fecha=${fecha}`
    );
  }

  //Crear cita
  crearCita(data: any): Observable<any> {
    return this.http.post(`${this.api}/citas`, data);
  }
}
