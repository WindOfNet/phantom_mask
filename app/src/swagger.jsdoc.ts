import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  apis: ["./dist/routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);
export default openapiSpecification;
