import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Job Board API",
      version: "1.0.0",
      description: "REST API for job seekers and employers",
    },

    servers: [
  { url: "/" },
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

  apis: ["./routes/*.ts",   
    "./dist/routes/*.js",],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;