import {
  Request,
  Response,
  NextFunction
} from "express";

import { ZodType } from "zod";

export function validarDTO(schema: ZodType) {

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        mensagem: "Dados inválidos",
        erros: resultado.error.issues
      });
    }

    req.body = resultado.data;

    next();
  };
}