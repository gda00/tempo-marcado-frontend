import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva, Sala, Usuario, TipoSala, Papel } from '../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  getSalas = (): Observable<Sala[]> => this.http.get<Sala[]>(`${this.apiUrl}/salas`);
  getReservas = (): Observable<Reserva[]> => this.http.get<Reserva[]>(`${this.apiUrl}/reservas`);
  getMinhasReservas = (): Observable<Reserva[]> => this.http.get<Reserva[]>(`${this.apiUrl}/reservas/minhas`);
  getUsuariosResponsaveis = (): Observable<Usuario[]> => this.http.get<Usuario[]>(`${this.apiUrl}/usuarios/responsaveis`);
  createReserva = (novaReserva: any): Observable<Reserva> => this.http.post<Reserva>(`${this.apiUrl}/reservas`, novaReserva);
  cancelarReserva = (id: number): Observable<void> => this.http.delete<void>(`${this.apiUrl}/reservas/${id}`);

  getUsuarios = (): Observable<Usuario[]> => this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  getPapeis = (): Observable<Papel[]> => this.http.get<Papel[]>(`${this.apiUrl}/papeis`);
  getTiposSala = (): Observable<TipoSala[]> => this.http.get<TipoSala[]>(`${this.apiUrl}/tipos-sala`);

  deleteUsuario = (id: number): Observable<void> => this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  
  createUsuario(usuarioData: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuarioData);
  }

  updateUsuario(id: number, usuarioData: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${id}`, usuarioData);
  }
  
  deleteSala = (id: number): Observable<void> => this.http.delete<void>(`${this.apiUrl}/salas/${id}`);
  createSala = (salaData: Partial<Sala>): Observable<Sala> => this.http.post<Sala>(`${this.apiUrl}/salas`, salaData);
  updateSala = (id: number, salaData: Partial<Sala>): Observable<Sala> => this.http.put<Sala>(`${this.apiUrl}/salas/${id}`, salaData);
}