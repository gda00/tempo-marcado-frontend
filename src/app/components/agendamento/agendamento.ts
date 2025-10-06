import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sala, Usuario } from '../../models/reserva.model';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-agendamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendamento.html',
  styleUrls: ['./agendamento.css'],
})
export class Agendamento implements OnInit {
  salas: Sala[] = [];
  usuariosResponsaveis: Usuario[] = [];

  salaSelecionada: Sala | null = null;
  dadosReserva = {
    data_hora_inicio: '',
    data_hora_fim: '',
    responsavel_id: null as number | null,
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getSalas().subscribe((salasDaApi) => {
      this.salas = salasDaApi;
    });

    this.apiService.getUsuariosResponsaveis().subscribe((usuarios) => {
      this.usuariosResponsaveis = usuarios;
    });
  }

  abrirFormularioReserva(sala: Sala): void {
    this.salaSelecionada = sala;
  }

  cancelarReserva(): void {
    this.salaSelecionada = null;
    this.dadosReserva = { data_hora_inicio: '', data_hora_fim: '', responsavel_id: null };
  }

  onSubmitReserva(): void {
    if (!this.salaSelecionada) return;

    const novaReserva = {
      sala_id: this.salaSelecionada.id,
      responsavel_id: this.dadosReserva.responsavel_id,
      data_hora_inicio: this.dadosReserva.data_hora_inicio,
      data_hora_fim: this.dadosReserva.data_hora_fim,
      status: 'Confirmada',
    };

    this.apiService.createReserva(novaReserva).subscribe({
      next: () => {
        alert('Reserva criada com sucesso!');
        this.cancelarReserva();
      },
      error: (err) => {
        console.error('Erro ao criar reserva:', err);
        alert('Não foi possível criar a reserva.');
      },
    });
  }
}