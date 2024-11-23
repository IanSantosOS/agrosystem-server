require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API Agrosystem',
        description: 'Documentação gerada automaticamente pelo Swagger',
    },
    host: process.env.SERVER_HOST + ':' + process.env.SERVER_PORT,
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
    .then(() => {
        console.log(`Swagger documentation generated at: ${outputFile}`);
    })
    .catch((error) => {
        console.error('Failed to generate Swagger documentation:', error);
    });