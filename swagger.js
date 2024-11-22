const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();

const doc = {
  info: {
    title: 'API Agrosystem',
    description: 'Documentação gerada automaticamente pelo Swagger',
  },
  host: process.env.HOST + ':' + process.env.PORT,
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)