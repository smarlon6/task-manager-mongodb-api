export type TaskStatus =
  | "PENDENTE"
  | "EM_ANDAMENTO"
  | "CONCLUIDA";

export type TaskPrioridade =
  | "BAIXA"
  | "MEDIA"
  | "ALTA";

export interface Task {
  id?: string;
  titulo: string;
  descricao: string;
  status: TaskStatus;
  prioridade: TaskPrioridade;
  dataCriacao: Date;
}