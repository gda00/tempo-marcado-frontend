// src/app/components/admin/gerenciar-usuarios/gerenciar-usuarios.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario, Papel } from '../../../models/reserva.model';
import { ApiService } from '../../../services/api';

@Component({
  selector: 'app-gerenciar-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gerenciar-usuarios.html',
  styleUrls: ['./gerenciar-usuarios.css']
})
export class GerenciarUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  papeis: Papel[] = [];

  isFormularioAberto = false;
  usuarioEmEdicao: Partial<Usuario> = {};
  papel_id_selecionado: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsuarios().subscribe(data => this.usuarios = data);
    this.apiService.getPapeis().subscribe(data => this.papeis = data);
  }

  abrirFormularioParaCriar(): void {
    this.usuarioEmEdicao = {};
    this.papel_id_selecionado = null;
    this.isFormularioAberto = true;
  }

  abrirFormularioParaEditar(usuario: Usuario): void {
    this.usuarioEmEdicao = { ...usuario };
    this.papel_id_selecionado = usuario.papel?.id ?? null;
    this.isFormularioAberto = true;
  }

  fecharFormulario(): void {
    this.isFormularioAberto = false;
    this.usuarioEmEdicao = {};
    this.papel_id_selecionado = null;
  }

  salvarUsuario(): void {
    const dadosParaSalvar = {
      ...this.usuarioEmEdicao,
      papel_id: this.papel_id_selecionado
    };

    if (dadosParaSalvar.id) {
      this.apiService.updateUsuario(dadosParaSalvar.id, dadosParaSalvar).subscribe({
        next: (usuarioAtualizado) => {
          alert('Usuário atualizado com sucesso!');
          const index = this.usuarios.findIndex(u => u.id === usuarioAtualizado.id);
          this.usuarios[index] = usuarioAtualizado;
          this.fecharFormulario();
        },
        error: (err) => alert('Erro ao atualizar o usuário.')
      });
    } else {
      this.apiService.createUsuario(dadosParaSalvar).subscribe({
        next: (novoUsuario) => {
          alert('Usuário criado com sucesso!');
          this.usuarios.push(novoUsuario);
          this.fecharFormulario();
        },
        error: (err) => alert('Erro ao criar o usuário.')
      });
    }
  }

  removerUsuario(id: number): void {
  if(confirm('Tem certeza que deseja remover este usuário?')) {
    this.apiService.deleteUsuario(id).subscribe({
      next: () => {
        alert('Usuário removido com sucesso!');
        // Atualiza a lista na tela removendo o usuário deletado
        this.usuarios = this.usuarios.filter(u => u.id !== id);
      },
      error: (err) => {
        alert('Erro ao remover usuário.');
        console.error(err);
      }
    });
  }
}
}