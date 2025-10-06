import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reserva } from '../../models/reserva.model';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-minhas-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './minhas-reservas.html',
  styleUrls: ['./minhas-reservas.css']
})
export class MinhasReservasComponent implements OnInit {
  minhasReservas: Reserva[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getMinhasReservas().subscribe(reservas => {
      this.minhasReservas = reservas;
    });
  }

  cancelarReserva(id: number): void {
    if (confirm('Tem certeza que deseja cancelar esta reserva?')) {
      this.apiService.cancelarReserva(id).subscribe({
        next: () => {
          alert('Reserva cancelada com sucesso!');
          this.minhasReservas = this.minhasReservas.filter(reserva => reserva.id !== id);
        },
        error: (err) => {
          alert('Ocorreu um erro ao cancelar a reserva.');
          console.error(err);
        }
      });
    }
  }

  isReservaFutura(reserva: Reserva): boolean {
    return new Date(reserva.data_hora_inicio) > new Date();
  }
}