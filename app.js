const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('./models/User');
const Product = require('./models/Product');
const Community = require('./models/Community');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/', require('./routes/router_v1'));
app.use('/docs/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Database sync (adjusted for production environment)
sequelize.sync({ force: process.env.NODE_ENV !== 'production' }).then(() => {
    console.log('\n\x1b[44;1m Banco de dados sincronizado! \x1b[0m');

    // Dados de exemplo no banco
    User.findOrCreate({ where: { email: 'flavio@gmail.com' }, defaults: { name: 'Flávio', username: 'flavio', password: '123456' } });
    User.findOrCreate({ where: { email: 'iansos@gmail.com' }, defaults: { name: 'Ian dos Santos', username: 'ian', password: 'ian' } });
    User.findOrCreate({ where: { email: 'grc3@gmail.com' }, defaults: { name: 'Gabriel', username: 'grc3', password: '123' } });
    User.findOrCreate({ where: { email: 'user@gmail.com' }, defaults: { name: 'Usuário', username: 'user', password: 'user' } });

    Product.findOrCreate({ where: { name: 'Cenoura' }, defaults: { price: 3, qnt: 200 } });
    Product.findOrCreate({ where: { name: 'Pá' }, defaults: { price: 35.99, qnt: 550 } });
    Product.findOrCreate({ where: { name: 'Trator' }, defaults: { price: 2000.50, qnt: 3 } });
    Product.findOrCreate({ where: { name: 'Sistema de Irrigação' }, defaults: { price: 3580.99, qnt: 3400 } });

    Community.findOrCreate({ where: { title: 'Comunidade Agrícola' }, defaults: { description: 'A melhor comunidade do Brasil.' } });
    Community.findOrCreate({ where: { title: 'Os Planta Feijão' }, defaults: { description: 'Só para quem gosta de comer feijão' } });
    Community.findOrCreate({ where: { title: 'Os Colhe Milho' }, defaults: { description: 'Milho é bom demais.' } });
    Community.findOrCreate({ where: { title: 'Comunidade do Arroz' }, defaults: { description: 'Um arrozinho para completar o almoço do dia.' } });
});

// Exportar o app para o Vercel
module.exports = app;
