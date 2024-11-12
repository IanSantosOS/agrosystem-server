// --------------------------- CONFIGURATION --------------------------

const sequelize = require('./config/database');
const session = require('express-session');
const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./models/User');
const Product = require('./models/Product');
const Community = require('./models/Community');

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'agrosystem-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// ------------------------------ ROUTES ------------------------------

app.use('/api/v1/', require('./routes/router_v1'));

// ------------------------------ SERVER ------------------------------

sequelize.sync({ force: true }).then(() => {
    console.log('\n\x1b[44;1m Banco de dados sincronizado! \x1b[0m');

    User.create({ name: 'Flávio',         username: 'flavio', email: 'flavio@gmail.com', password: '123456' });
    User.create({ name: 'Ian dos Santos', username: 'ian',    email: 'iansos@gmail.com', password: 'ian'    });
    User.create({ name: 'Gabriel',        username: 'grc3',   email: 'grc3@gmail.com',   password: '123'    });
    User.create({ name: 'Usuário',        username: 'user',   email: 'user@gmail.com',   password: 'user'   });

    Product.create({ name: "Cenoura",              price: 3,       qnt: 200  });
    Product.create({ name: "Pá",                   price: 35.99,   qnt: 550  });
    Product.create({ name: "Trator",               price: 2000.50, qnt: 3    });
    Product.create({ name: "Sistema de Irrigação", price: 3580.99, qnt: 3400 });

    Community.create({ title: "Comunidade Agrícola", description: "A melhor comunidade do Brasil." });
    Community.create({ title: "Os Planta Feijão",    description: "Só para quem gosta de comer feijão" });
    Community.create({ title: "Os Colhe Milho",      description: "Milho é bom demais." });
    Community.create({ title: "Comunidade do Arroz", description: "Um arrozinho para completar o almoço do dia." });

    const PORT = process.env.PORT || 3300;
    app.listen(PORT, () => {
        console.log(`\x1b[43;1m Funcionou!!! \x1b[0m Servidor está rodando na porta: ${PORT}\x1b[0m\n`);
    });
});