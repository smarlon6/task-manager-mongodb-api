import { Task } from "../../domain/entities/task.entity";
import { ITaskRepository } from "../../domain/repositories/task.repository.interface";
import {
  TaskDocument,
  TaskModel
} from "../schemas/task.schema";

export class MongooseTaskRepository implements ITaskRepository {

  private mapearParaDominio(documento: TaskDocument): Task {
    return {
      id: documento._id.toString(),
      titulo: documento.titulo,
      descricao: documento.descricao,
      status: documento.status,
      prioridade: documento.prioridade,
      dataCriacao: documento.dataCriacao
    };
  }

  async criar(task: Task): Promise<Task> {
    const documento = await TaskModel.create({
      titulo: task.titulo,
      descricao: task.descricao,
      status: task.status,
      prioridade: task.prioridade,
      dataCriacao: task.dataCriacao
    });

    return this.mapearParaDominio(documento);
  }

  async buscarTodos(): Promise<Task[]> {
    const documentos = await TaskModel.find();

    return documentos.map(
      documento => this.mapearParaDominio(documento)
    );
  }

  async buscarPorId(id: string): Promise<Task | null> {
    const documento = await TaskModel.findById(id);

    if (!documento) {
      return null;
    }

    return this.mapearParaDominio(documento);
  }

  async atualizar(
    id: string,
    task: Partial<Task>
  ): Promise<Task | null> {

    const documento = await TaskModel.findByIdAndUpdate(
      id,
      {
        $set: task
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!documento) {
      return null;
    }

    return this.mapearParaDominio(documento);
  }

  async excluir(id: string): Promise<boolean> {
    const documento = await TaskModel.findByIdAndDelete(id);

    return documento !== null;
  }
}