import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  senha = '';

  constructor(private authService: AuthService, private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Tempo Marcado - Login');
  }

  onSubmit(): void {
    const credentials = { email: this.email, senha: this.senha };

    this.authService.login(credentials).subscribe({
      next: (usuario) => {
        console.log('Login bem-sucedido!', usuario);
        alert('Login realizado com sucesso!');
        this.router.navigate(['/agendamento']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('E-mail ou senha incorretos.');
      }
    });
  }
}