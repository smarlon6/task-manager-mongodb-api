import { z } from "zod";

export const createTaskSchema = z.object({
  titulo: z
    .string()
    .min(3, "O título deve ter pelo menos 3 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),

  descricao: z
    .string()
    .min(1, "A descrição é obrigatória")
    .max(500, "A descrição deve ter no máximo 500 caracteres"),

  status: z.enum([
    "PENDENTE",
    "EM_ANDAMENTO",
    "CONCLUIDA"
  ]),

  prioridade: z.enum([
    "BAIXA",
    "MEDIA",
    "ALTA"
  ])
});

export type CreateTaskDTO =
  z.infer<typeof createTaskSchema>;