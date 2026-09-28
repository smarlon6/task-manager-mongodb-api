import express from "express";

import { MongooseTaskRepository } from "./infrastructure/repositories/mongoose-task.repository";
import { TaskService } from "./application/services/task.service";
import { TaskController } from "./presentation/controllers/task.controller";
import { criarTaskRoutes } from "./presentation/routes/task.routes";

const app = express();

app.use(express.json());

/*
 * Composição das dependências
 */
const taskRepository =
  new MongooseTaskRepository();

const taskService =
  new TaskService(taskRepository);

const taskController =
  new TaskController(taskService);

/*
 * Rota inicial
 */
app.get("/", (req, res) => {
  res.status(200).json({
    mensagem: "Task Manager MongoDB API funcionando"
  });
});

/*
 * Rotas de negócio
 */
app.use(
  "/tasks",
  criarTaskRoutes(taskController)
);

export default app;