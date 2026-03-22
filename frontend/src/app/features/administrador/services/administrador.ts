import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private api = 'http://localhost:3000/administrador';

  constructor(private http: HttpClient) {}

  obtenerConfiguracion() {
    return this.http.get(`${this.api}/configuracion`);
  }

  guardarConfiguracion(data: any) {
    return this.http.post(`${this.api}/configuracion`, data);
  }
}
