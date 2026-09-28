import { Task } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/repositories/task.repository.interface";

export class TaskService {

  constructor(
    private readonly taskRepository: ITaskRepository
  ) {}

  async criar(
    dados: Omit<Task, "id" | "dataCriacao">
  ): Promise<Task> {

    const task: Task = {
      ...dados,
      dataCriacao: new Date()
    };

    return this.taskRepository.criar(task);
  }

  async buscarTodos(): Promise<Task[]> {
    return this.taskRepository.buscarTodos();
  }

  async buscarPorId(
    id: string
  ): Promise<Task | null> {

    return this.taskRepository.buscarPorId(id);
  }

  async atualizar(
    id: string,
    dados: Partial<Omit<Task, "id" | "dataCriacao">>
  ): Promise<Task | null> {

    return this.taskRepository.atualizar(
      id,
      dados
    );
  }

  async excluir(
    id: string
  ): Promise<boolean> {

    return this.taskRepository.excluir(id);
  }
}