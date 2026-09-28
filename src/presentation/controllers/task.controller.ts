import {
  Request,
  Response
} from "express";

import { TaskService } from "../../application/services/task.service";

export class TaskController {

  constructor(
    private readonly taskService: TaskService
  ) {}

  async criar(
    req: Request,
    res: Response
  ): Promise<Response> {

    try {

      const task =
        await this.taskService.criar(req.body);

      return res.status(201).json(task);

    } catch (error) {

      return res.status(500).json({
        mensagem: "Erro ao criar tarefa"
      });
    }
  }

  async buscarTodos(
    req: Request,
    res: Response
  ): Promise<Response> {

    try {

      const tasks =
        await this.taskService.buscarTodos();

      return res.status(200).json(tasks);

    } catch (error) {

      return res.status(500).json({
        mensagem: "Erro ao buscar tarefas"
      });
    }
  }

  async buscarPorId(
    req: Request,
    res: Response
  ): Promise<Response> {

    try {

      const id = req.params.id;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          mensagem: "ID da tarefa inválido"
        });
      }

      const task =
        await this.taskService.buscarPorId(id);

      if (!task) {
        return res.status(404).json({
          mensagem: "Tarefa não encontrada"
        });
      }

      return res.status(200).json(task);

    } catch (error) {

      return res.status(400).json({
        mensagem: "ID da tarefa inválido"
      });
    }
  }

  async atualizar(
    req: Request,
    res: Response
  ): Promise<Response> {

    try {

      const id = req.params.id;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          mensagem: "ID da tarefa inválido"
        });
      }

      const task =
        await this.taskService.atualizar(
          id,
          req.body
        );

      if (!task) {
        return res.status(404).json({
          mensagem: "Tarefa não encontrada"
        });
      }

      return res.status(200).json(task);

    } catch (error) {

      return res.status(400).json({
        mensagem: "Não foi possível atualizar a tarefa"
      });
    }
  }

  async excluir(
    req: Request,
    res: Response
  ): Promise<Response> {

    try {

      const id = req.params.id;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          mensagem: "ID da tarefa inválido"
        });
      }

      const excluido =
        await this.taskService.excluir(id);

      if (!excluido) {
        return res.status(404).json({
          mensagem: "Tarefa não encontrada"
        });
      }

      return res.status(204).send();

    } catch (error) {

      return res.status(400).json({
        mensagem: "Não foi possível excluir a tarefa"
      });
    }
  }
}