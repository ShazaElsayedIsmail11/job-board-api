import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const adapter = new PrismaPg({
  connectionString: databaseUrl!,
});

const prisma = new PrismaClient({ adapter });

export default prisma;