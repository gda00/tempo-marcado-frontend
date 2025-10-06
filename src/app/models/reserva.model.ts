export interface Papel {
  id: number;
  nome: string;
  pode_ser_responsavel: boolean;
}

export interface Usuario {
  id: number;
  nome_completo: string;
  email: string;
  papel?: Papel;
  senha?: string;
}

export interface TipoSala {
  id: number;
  nome: string;
  descricao: string;
}

export interface Sala {
  id: number;
  nome_sala: string;
  localizacao: string;
  capacidade: number;
  ativa: boolean;
  tipo_sala: TipoSala;
}

export interface Usuario {
  id: number;
  nome_completo: string;
  email: string;
}

export interface Reserva {
  id: number;
  data_hora_inicio: Date;
  data_hora_fim: Date;
  status: string;
  sala: Sala;
  solicitante: Usuario;
  responsavel: Usuario;
}