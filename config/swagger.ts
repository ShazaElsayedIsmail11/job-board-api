import swaggerJsdoc from "swagger-jsdoc";
import path from "node:path";

const routesTsPath = path
  .resolve(process.cwd(), "routes", "*.ts")
  .replace(/\\/g, "/");

const routesJsPath = path
  .resolve(process.cwd(), "dist", "routes", "*.js")
  .replace(/\\/g, "/");

const options: swaggerJsdoc.Options = {
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

  apis: [
    routesTsPath,
    routesJsPath,
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;