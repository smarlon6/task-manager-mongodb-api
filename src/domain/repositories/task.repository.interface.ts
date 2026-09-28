import { Task } from "../entities/task.entity";

export interface ITaskRepository {

  criar(task: Task): Promise<Task>;

  buscarTodos(): Promise<Task[]>;

  buscarPorId(id: string): Promise<Task | null>;

  atualizar(
    id: string,
    task: Partial<Task>
  ): Promise<Task | null>;

  excluir(id: string): Promise<boolean>;
}