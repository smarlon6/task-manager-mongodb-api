import app from "./app";

import { conectarMongoDB } from "./infrastructure/database/mongodb";
import { env } from "./config/env";

async function iniciarServidor(): Promise<void> {

  try {

    await conectarMongoDB(env.MONGODB_URI);

    app.listen(env.PORT, () => {
      console.log(
        `Servidor executando na porta ${env.PORT}`
      );
    });

  } catch (error) {

    console.error(
      "Não foi possível iniciar a aplicação:",
      error
    );

    process.exit(1);
  }
}

iniciarServidor();