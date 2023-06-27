export interface Professor {
  nome: string;
  email: string;
}

export interface Course {
  nome: string;
  turno: string;
  agrupamento: number;
}

export interface Classe {
  curso_id: string;
  periodo: number;
  qtalunos: number;
}

export interface Subject {
  nome: string;
  professor_id: string;
  curso_id: string;
  periodo: number;
  qtaulas: number;
}

export interface Restrictions {
  professor_id: string;
  dia: string;
  periodo: number;
}

export interface Room {
  nome: string;
  capacidade: number;
  qtdpcs: number;
}
