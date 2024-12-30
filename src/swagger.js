const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "API para la gestión de tareas",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID único de la tarea",
              example: "60d5f3a71c5b4d2fbc8e4b2a",
            },
            title: {
              type: "string",
              description: "Título de la tarea",
              example: "Nueva tarea",
            },
            description: {
              type: "string",
              description: "Descripción de la tarea",
              example: "Descripción de la nueva tarea",
            },
            completed: {
              type: "boolean",
              description: "Estado de completado de la tarea",
              example: false,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación de la tarea",
              example: "2024-12-30T12:00:00Z",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
