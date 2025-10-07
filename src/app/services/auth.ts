// src/app/services/auth.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from '../models/reserva.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUser: Usuario | null = null;
  private router = inject(Router);

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, senha: string }): Observable<Usuario> {
    console.log('AuthService: MODO DE TESTE (MOCK) ATIVO', credentials);

    // Dados dos usuários de teste
    const adminUser: Usuario = { id: 101, nome_completo: 'Admin João', email: 'admin@utfpr.edu.br', papel: { id: 1, nome: 'Administrador', pode_ser_responsavel: true }};
    const profUser: Usuario = { id: 102, nome_completo: 'Prof. Maria Souza', email: 'maria.souza@utfpr.edu.br', papel: { id: 2, nome: 'Professor', pode_ser_responsavel: true }};
    const studentUser: Usuario = { id: 103, nome_completo: 'Aluno Pedro Costa', email: 'pedro.costa@utfpr.edu.br', papel: { id: 3, nome: 'Aluno', pode_ser_responsavel: false }};

    if (credentials.email === adminUser.email && credentials.senha === 'admin123') {
      this.currentUser = adminUser;
      return of(this.currentUser).pipe(delay(300));
    } else if (credentials.email === profUser.email && credentials.senha === 'prof123') { // NOVO LOGIN
      this.currentUser = profUser;
      return of(this.currentUser).pipe(delay(300));
    } else if (credentials.email === studentUser.email && credentials.senha === '123') {
      this.currentUser = studentUser;
      return of(this.currentUser).pipe(delay(300));
    } else {
      return throwError(() => new Error('Credenciais inválidas')).pipe(delay(300));
    }
  }

  // NOVO MÉTODO: para que outros serviços saibam quem está logado
  getCurrentUser = (): Usuario | null => this.currentUser;
  isLoggedIn = (): boolean => this.currentUser !== null;
  isAdmin = (): boolean => this.currentUser?.papel?.nome === 'Administrador';

  logout(): void {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }
}