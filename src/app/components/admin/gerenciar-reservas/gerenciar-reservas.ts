import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reserva } from '../../../models/reserva.model';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-gerenciar-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gerenciar-reservas.html',
  styleUrls: ['./gerenciar-reservas.css']
})
export class GerenciarReservasComponent implements OnInit {
  reservas: Reserva[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getReservas().subscribe(data => {
      this.reservas = data;
    });
  }

  cancelarReserva(id: number): void {
    if (confirm('Tem certeza que deseja cancelar esta reserva? O usuário será notificado.')) {
      this.apiService.cancelarReserva(id).subscribe({
        next: () => {
          alert('Reserva cancelada com sucesso!');
          const reserva = this.reservas.find(r => r.id === id);
          if (reserva) {
            reserva.status = 'Cancelada';
          }
        },
        error: (err) => alert('Erro ao cancelar a reserva.')
      });
    }
  }

  isReservaFutura(reserva: Reserva): boolean {
    return new Date(reserva.data_hora_inicio) > new Date();
  }
}