import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/reserva.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUser: Usuario | null = null;
  private router = inject(Router);

  constructor(private http: HttpClient) {
    const usuarioSalvo = localStorage.getItem('currentUser');
    if (usuarioSalvo) {
      this.currentUser = JSON.parse(usuarioSalvo);
    }
  }

  login(credentials: { email: string, senha: string }): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials).pipe(
      tap((usuario) => {
        this.currentUser = usuario;
        localStorage.setItem('currentUser', JSON.stringify(usuario));
      })
    );
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
  
  isAdmin(): boolean {
    return this.currentUser?.papel?.nome === 'Administrador';
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}