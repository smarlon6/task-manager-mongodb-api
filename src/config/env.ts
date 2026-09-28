import "dotenv/config";

const PORT = Number(process.env.PORT ?? 3000);

const MONGODB_URI =
  process.env.MONGODB_URI ??
  "mongodb://localhost:27017/task_manager";

export const env = {
  PORT,
  MONGODB_URI
};