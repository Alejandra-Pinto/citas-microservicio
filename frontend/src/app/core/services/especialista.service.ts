// especialista.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EspecialistaService {
  private apiUrl = 'http://localhost:3000/especialistas'; // Ajusta a tu URL

  constructor(private http: HttpClient) {}

  listarEspecialistas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}