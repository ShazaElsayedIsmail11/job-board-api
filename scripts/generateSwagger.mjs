import swaggerJsdoc from "swagger-jsdoc";
import path from "node:path";
import { writeFileSync } from "node:fs";

const routesPath = path
  .resolve(process.cwd(), "routes", "*.ts")
  .replace(/\\/g, "/");

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Job Board API",
      version: "1.0.0",
      description: "REST API for job seekers and employers",
    },

    servers: [
      {
        url: "/",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: [routesPath],
});

const outputPath = path.resolve(
  process.cwd(),
  "config",
  "swaggerSpec.generated.ts"
);

writeFileSync(
  outputPath,
  `const swaggerSpec = ${JSON.stringify(swaggerSpec, null, 2)};\n\nexport default swaggerSpec;\n`
);

console.log("Swagger specification generated successfully");