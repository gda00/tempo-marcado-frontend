import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Sala, TipoSala } from '../../../models/reserva.model';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-gerenciar-salas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-salas.html',
  styleUrls: ['./gerenciar-salas.css']
})
export class GerenciarSalasComponent implements OnInit {
  salas: Sala[] = [];
  tiposSala: TipoSala[] = [];
  
  isFormularioAberto = false;
  salaEmEdicao: Partial<Sala> = {}; 
  
  tipo_sala_id_selecionado: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getSalas().subscribe(data => this.salas = data);
    this.apiService.getTiposSala().subscribe(data => this.tiposSala = data);
  }

  abrirFormularioParaCriar(): void {
    this.salaEmEdicao = { ativa: true, capacidade: 0 };
    this.tipo_sala_id_selecionado = null;
    this.isFormularioAberto = true;
  }

  abrirFormularioParaEditar(sala: Sala): void {
    this.salaEmEdicao = { ...sala };
    this.tipo_sala_id_selecionado = sala.tipo_sala?.id ?? null;
    this.isFormularioAberto = true;
  }

  fecharFormulario(): void {
    this.isFormularioAberto = false;
    this.salaEmEdicao = {};
    this.tipo_sala_id_selecionado = null;
  }

  salvarSala(): void {
    const dadosParaSalvar = {
      ...this.salaEmEdicao,
      tipo_sala_id: this.tipo_sala_id_selecionado
    };

    if (dadosParaSalvar.id) {
      this.apiService.updateSala(dadosParaSalvar.id, dadosParaSalvar).subscribe({
        next: (salaAtualizada) => {
          alert('Sala atualizada com sucesso!');
          const index = this.salas.findIndex(s => s.id === salaAtualizada.id);
          this.salas[index] = salaAtualizada;
          this.fecharFormulario();
        },
        error: (err) => alert('Erro ao atualizar a sala.')
      });
    } else {
      this.apiService.createSala(dadosParaSalvar).subscribe({
        next: (novaSala) => {
          alert('Sala criada com sucesso!');
          this.salas.push(novaSala);
          this.fecharFormulario();
        },
        error: (err) => alert('Erro ao criar a sala.')
      });
    }
  }

  removerSala(id: number): void {
    if (confirm('Tem certeza que deseja remover esta sala?')) {
      this.apiService.deleteSala(id).subscribe({
        next: () => {
          alert('Sala removida com sucesso!');
          this.salas = this.salas.filter(s => s.id !== id);
        },
        error: (err) => alert('Erro ao remover a sala.')
      });
    }
  }
}