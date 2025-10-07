// src/app/services/api.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Reserva, Sala, Usuario, TipoSala, Papel } from '../models/reserva.model';
import { AuthService } from './auth'; // Importe o AuthService

// #region DADOS MOCKADOS (MAIS COMPLETOS)
let MOCK_PAPEIS: Papel[] = [
    { id: 1, nome: 'Administrador', pode_ser_responsavel: true },
    { id: 2, nome: 'Professor', pode_ser_responsavel: true },
    { id: 3, nome: 'Aluno', pode_ser_responsavel: false }
];
let MOCK_TIPOS_SALA: TipoSala[] = [
    { id: 1, nome: 'Laboratório de Música', descricao: 'Sala com isolamento acústico' },
    { id: 2, nome: 'Sala de Aula Comum', descricao: 'Sala com projetor e quadro branco' },
    { id: 3, nome: 'Estúdio de Gravação', descricao: 'Sala de gravação profissional' }
];
let MOCK_USUARIOS: Usuario[] = [
    { id: 101, nome_completo: 'Admin João', email: 'admin@utfpr.edu.br', papel: MOCK_PAPEIS[0] },
    { id: 102, nome_completo: 'Prof. Maria Souza', email: 'maria.souza@utfpr.edu.br', papel: MOCK_PAPEIS[1] },
    { id: 103, nome_completo: 'Aluno Pedro Costa', email: 'pedro.costa@utfpr.edu.br', papel: MOCK_PAPEIS[2] },
    { id: 104, nome_completo: 'Aluna Ana Clara', email: 'ana.clara@utfpr.edu.br', papel: MOCK_PAPEIS[2] }
];
let MOCK_SALAS: Sala[] = [
  { id: 201, nome_sala: 'Sala de Ensaio 1', localizacao: 'Bloco C, Térreo', capacidade: 15, ativa: true, tipo_sala: MOCK_TIPOS_SALA[0] },
  { id: 202, nome_sala: 'Sala 201', localizacao: 'Bloco E, 2º Andar', capacidade: 40, ativa: true, tipo_sala: MOCK_TIPOS_SALA[1] },
  { id: 203, nome_sala: 'Estúdio B', localizacao: 'Bloco C, Subsolo', capacidade: 5, ativa: false, tipo_sala: MOCK_TIPOS_SALA[2] },
  { id: 204, nome_sala: 'Sala de Teoria 101', localizacao: 'Bloco B, 1º Andar', capacidade: 30, ativa: true, tipo_sala: MOCK_TIPOS_SALA[1] }
];
let MOCK_RESERVAS: Reserva[] = [
  { id: 301, data_hora_inicio: new Date('2025-09-30T10:00:00'), data_hora_fim: new Date('2025-09-30T12:00:00'), status: 'Confirmada', sala: MOCK_SALAS[0], solicitante: MOCK_USUARIOS[2], responsavel: MOCK_USUARIOS[1] },
  { id: 302, data_hora_inicio: new Date('2025-10-20T14:00:00'), data_hora_fim: new Date('2025-10-20T16:00:00'), status: 'Confirmada', sala: MOCK_SALAS[1], solicitante: MOCK_USUARIOS[2], responsavel: MOCK_USUARIOS[1] },
  { id: 303, data_hora_inicio: new Date('2025-10-22T09:00:00'), data_hora_fim: new Date('2025-10-22T11:00:00'), status: 'Confirmada', sala: MOCK_SALAS[3], solicitante: MOCK_USUARIOS[1], responsavel: MOCK_USUARIOS[1] },
  { id: 304, data_hora_inicio: new Date('2025-10-25T18:00:00'), data_hora_fim: new Date('2025-10-25T19:00:00'), status: 'Pendente', sala: MOCK_SALAS[0], solicitante: MOCK_USUARIOS[3], responsavel: MOCK_USUARIOS[1] },
];
// #endregion

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';
  // Injeta o AuthService para saber quem está logado
  private authService = inject(AuthService);

  constructor(private http: HttpClient) { }

  getMinhasReservas = (): Observable<Reserva[]> => {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return of([]);

    // Agora filtra as reservas dinamicamente com base no usuário logado
    const minhas = MOCK_RESERVAS.filter(r => r.solicitante.id === currentUser.id);
    return of(minhas).pipe(delay(300));
  };
  
  // ... (o resto do arquivo continua igual, apenas colei ele aqui para ficar completo) ...
  getSalas = (): Observable<Sala[]> => of(MOCK_SALAS).pipe(delay(300));
  getReservas = (): Observable<Reserva[]> => of(MOCK_RESERVAS).pipe(delay(300));
  getUsuariosResponsaveis = (): Observable<Usuario[]> => of(MOCK_USUARIOS.filter(u => u.papel?.pode_ser_responsavel)).pipe(delay(300));
  createReserva = (novaReserva: any): Observable<Reserva> => {
    const currentUser = this.authService.getCurrentUser();
    const sala = MOCK_SALAS.find(s => s.id === novaReserva.sala_id);
    const responsavel = MOCK_USUARIOS.find(u => u.id === novaReserva.responsavel_id);
    if (!sala || !currentUser || !responsavel) return throwError(() => new Error('Dados inválidos'));
    const reservaCriada: Reserva = { ...novaReserva, id: Math.floor(Math.random() * 1000), sala, solicitante: currentUser, responsavel };
    MOCK_RESERVAS.push(reservaCriada);
    return of(reservaCriada).pipe(delay(300));
  };
  cancelarReserva = (id: number): Observable<void> => {
    const reserva = MOCK_RESERVAS.find(r => r.id === id);
    if (reserva) reserva.status = 'Cancelada';
    return of(undefined).pipe(delay(300));
  };
  getUsuarios = (): Observable<Usuario[]> => of(MOCK_USUARIOS).pipe(delay(300));
  getPapeis = (): Observable<Papel[]> => of(MOCK_PAPEIS).pipe(delay(300));
  getTiposSala = (): Observable<TipoSala[]> => of(MOCK_TIPOS_SALA).pipe(delay(300));
  deleteUsuario = (id: number): Observable<void> => {
    MOCK_USUARIOS = MOCK_USUARIOS.filter(u => u.id !== id);
    return of(undefined).pipe(delay(300));
  };
  createUsuario = (usuarioData: Partial<Usuario>): Observable<Usuario> => {
    const papel = MOCK_PAPEIS.find(p => p.id === (usuarioData as any).papel_id);
    const novoUsuario = { ...usuarioData, id: Math.floor(Math.random() * 1000), papel: papel } as Usuario;
    MOCK_USUARIOS.push(novoUsuario);
    return of(novoUsuario).pipe(delay(300));
  };
  updateUsuario = (id: number, usuarioData: Partial<Usuario>): Observable<Usuario> => {
    const index = MOCK_USUARIOS.findIndex(u => u.id === id);
    const papel = MOCK_PAPEIS.find(p => p.id === (usuarioData as any).papel_id);
    if (index > -1) {
      MOCK_USUARIOS[index] = { ...MOCK_USUARIOS[index], ...usuarioData, papel } as Usuario;
      return of(MOCK_USUARIOS[index]).pipe(delay(300));
    }
    return throwError(() => new Error('Usuário não encontrado'));
  };
  deleteSala = (id: number): Observable<void> => {
    MOCK_SALAS = MOCK_SALAS.filter(s => s.id !== id);
    return of(undefined).pipe(delay(300));
  };
  createSala = (salaData: Partial<Sala>): Observable<Sala> => {
    const tipo = MOCK_TIPOS_SALA.find(t => t.id === (salaData as any).tipo_sala_id);
    const novaSala = { ...salaData, id: Math.floor(Math.random() * 1000), tipo_sala: tipo! } as Sala;
    MOCK_SALAS.push(novaSala);
    return of(novaSala).pipe(delay(300));
  };
  updateSala = (id: number, salaData: Partial<Sala>): Observable<Sala> => {
    const index = MOCK_SALAS.findIndex(s => s.id === id);
    const tipo = MOCK_TIPOS_SALA.find(t => t.id === (salaData as any).tipo_sala_id);
    if (index > -1) {
      MOCK_SALAS[index] = { ...MOCK_SALAS[index], ...salaData, tipo_sala: tipo! } as Sala;
      return of(MOCK_SALAS[index]).pipe(delay(300));
    }
    return throwError(() => new Error('Sala não encontrada'));
  };
}