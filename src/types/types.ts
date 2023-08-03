export interface Professor {
  nome: string;
  email: string;
}

export interface Course {
  nome: string;
  turno: string;
}

export interface Classe {
  name: string;
  curso_id: string;
  periodo: number;
  qtalunos: number;
}

export interface Subject {
  nome: string;
  periodo: number;
}

export interface Restrictions {
  professor_id: string;
  dia: string;
  periodo: string;
}

export interface Room {
  nome: string;
  capacidade: number;
  fixa: boolean;
  turma_id:string;
  predio:string;
}
