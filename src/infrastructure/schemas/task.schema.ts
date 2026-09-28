import { Schema, model, Document } from "mongoose";

export interface TaskDocument extends Document {
  titulo: string;
  descricao: string;
  status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";
  prioridade: "BAIXA" | "MEDIA" | "ALTA";
  dataCriacao: Date;
}

const taskSchema = new Schema<TaskDocument>(
  {
    titulo: {
      type: String,
      required: true,
      trim: true
    },

    descricao: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: [
        "PENDENTE",
        "EM_ANDAMENTO",
        "CONCLUIDA"
      ],
      required: true,
      default: "PENDENTE"
    },

    prioridade: {
      type: String,
      enum: [
        "BAIXA",
        "MEDIA",
        "ALTA"
      ],
      required: true
    },

    dataCriacao: {
      type: Date,
      default: Date.now
    }
  },
  {
    versionKey: false,
    collection: "tasks"
  }
);

export const TaskModel = model<TaskDocument>(
  "Task",
  taskSchema
);