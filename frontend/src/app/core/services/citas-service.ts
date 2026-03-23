import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  private api = 'http://localhost:3000/citas';

  constructor(private http: HttpClient) {}

  // Crear cita
  crearCita(data: any): Observable<any> {
    return this.http.post(`${this.api}`, data);
  }

  // Listar citas por especialista y fecha
  listarCitas(especialistaId: string, fecha: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.api}`, {
      params: { especialistaId, fecha },
    });
  }

  // Disponibilidad
  getDisponibilidad(especialistaId: string, fecha: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/disponibilidad`, {
      params: { especialistaId, fecha },
    });
  }

  // Paciente
  getPaciente(documento: string): Observable<any> {
    return this.http.get(`http://localhost:3000/pacientes/${documento}`);
  }

  buscarSugerencias(termino: string) {
    return this.http.get<any[]>(`${this.api}/pacientes/buscar?q=${termino}`);
  }
}
