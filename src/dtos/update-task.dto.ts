import { z } from "zod";

export const updateTaskSchema = z.object({
  titulo: z
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres")
    .optional(),

  descricao: z
    .string()
    .min(1, "A descrição não pode ficar vazia")
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .optional(),

  status: z
    .enum([
      "PENDENTE",
      "EM_ANDAMENTO",
      "CONCLUIDA"
    ])
    .optional(),

  prioridade: z
    .enum([
      "BAIXA",
      "MEDIA",
      "ALTA"
    ])
    .optional()
});

export type UpdateTaskDTO =
  z.infer<typeof updateTaskSchema>;