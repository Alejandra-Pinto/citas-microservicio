import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private api = 'http://localhost:3000/pacientes';

  constructor(private http: HttpClient) {}

  // Obtener un paciente por su ID/Documento
  getPaciente(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  // Buscar sugerencias para el autocompletado
  buscarSugerencias(termino: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/buscar?q=${termino}`);
  }
}