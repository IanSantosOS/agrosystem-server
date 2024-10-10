// GENERAL CONFIG

const app = require('express')();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SERVER

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n\x1b[43;1m Funcionou!!! \x1b[0m Servidor está rodando na porta: ${PORT}\x1b[0m\n`);
});