import mongoose from "mongoose";

export async function conectarMongoDB(
  uri: string
): Promise<void> {
  try {
    await mongoose.connect(uri);

    console.log("MongoDB conectado com sucesso.");
  } catch (error) {
    console.error(
      "Erro ao conectar ao MongoDB:",
      error
    );

    throw error;
  }
}