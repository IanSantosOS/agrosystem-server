// --------------------------- CONFIGURATION --------------------------

const sequelize = require('./config/database');
const session = require('express-session');
const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./models/User');

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

app.use('/api/v1/', require('./routes/router'));

// ------------------------------ SERVER ------------------------------

sequelize.sync({ force: true }).then(() => {
    console.log('\n\x1b[44;1m Banco de dados sincronizado! \x1b[0m');
    User.create({ name: 'Flávio',         username: 'flavio', email: 'flavio@gmail.com', password: '123456' });
    User.create({ name: 'Ian dos Santos', username: 'ian',    email: 'iansos@gmail.com', password: 'ian'    });
    User.create({ name: 'Gabriel',        username: 'grc3',   email: 'grc3@gmail.com',   password: '123'    });
    User.create({ name: 'Usuário',        username: 'user',   email: 'user@gmail.com',   password: 'user'   });

    const PORT = process.env.PORT || 3300;
    app.listen(PORT, () => {
        console.log(`\x1b[43;1m Funcionou!!! \x1b[0m Servidor está rodando na porta: ${PORT}\x1b[0m\n`);
    });
});