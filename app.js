// --------------------------- CONFIGURATION --------------------------

require('dotenv').config();

const sequelize = require('./config/database');
const express = require('express');
const cors = require('cors');
const app = express();
const { User, Product, Community } = require('./models');
const swaggerFile = require('./swagger-output.json');
const swaggerUi = require('swagger-ui-express');

const http = require('http');
const { initWebSocket } = require('./config/ws');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);
initWebSocket(server);

// ------------------------------ ROUTES -------------------------------

app.use('/api/v1/', require('./routes/router_v1'));
app.use('/docs/', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// ------------------------------ SERVER -------------------------------

sequelize.sync({ force: true }).then(async () => {
    console.log('\n\x1b[44;1m Banco de dados sincronizado! \x1b[0m');

    await User.create({ name: 'Usuário', username: 'user',   email: 'user@gmail.com',   password: 'user'   });
    await User.create({ name: 'Flávio',  username: 'flavio', email: 'flavio@gmail.com', password: '123456' });
    await User.create({ name: 'Gabriel', username: 'grc3',   email: 'grc3@gmail.com',   password: '123'    });
    await User.create({ name: 'Ian',     username: 'ian',    email: 'iansos@gmail.com', password: 'ian'    });

    await Product.create({ name: "Cenoura",              price: 3,       qnt: 200,  userId: 2 });
    await Product.create({ name: "Pá",                   price: 35.99,   qnt: 550,  userId: 2 });
    await Product.create({ name: "Trator",               price: 2000.50, qnt: 3,    userId: 3 });
    await Product.create({ name: "Sistema de Irrigação", price: 3580.99, qnt: 3400, userId: 1 });

    await Community.create({ title: "Comunidade Agrícola", description: "A melhor comunidade do Brasil.",               userId: 4 });
    await Community.create({ title: "Os Planta Feijão",    description: "Só para quem gosta de comer feijão",           userId: 4 });
    await Community.create({ title: "Os Colhe Milho",      description: "Milho é bom demais.",                          userId: 1 });
    await Community.create({ title: "Comunidade do Arroz", description: "Um arrozinho para completar o almoço do dia.", userId: 2 });

    const PORT = process.env.SERVER_PORT || 3300;
    server.listen(PORT, () => {
        console.log(`\x1b[43;1m Funcionou!!! \x1b[0m Servidor está rodando na porta: \x1b[33;1m${PORT}\x1b[0m\n`);
    });
});
