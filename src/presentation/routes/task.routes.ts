import { Router } from "express";

import { TaskController } from "../controllers/task.controller";
import { validarDTO } from "../middlewares/validation.middleware";

import { createTaskSchema } from "../../dtos/create-task.dto";
import { updateTaskSchema } from "../../dtos/update-task.dto";

export function criarTaskRoutes(
  taskController: TaskController
): Router {

  const router = Router();

  router.post(
    "/",
    validarDTO(createTaskSchema),
    (req, res) => taskController.criar(req, res)
  );

  router.get(
    "/",
    (req, res) => taskController.buscarTodos(req, res)
  );

  router.get(
    "/:id",
    (req, res) => taskController.buscarPorId(req, res)
  );

  router.put(
    "/:id",
    validarDTO(updateTaskSchema),
    (req, res) => taskController.atualizar(req, res)
  );

  router.delete(
    "/:id",
    (req, res) => taskController.excluir(req, res)
  );

  return router;
}