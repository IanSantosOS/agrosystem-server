const Message = require('../models/Message');
const WebSocket = require('ws');

let clients = [];

const initWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Novo cliente conectado!');
        clients.push(ws);

        ws.on('message', async (message) => {
            console.log(`Mensagem recebida: ${message}`);
            // Salve no banco
            await Message.create({ content: message, communityId: 1 }); // ajuste o ID da comunidade
            // Reenvie para todos os clientes
            clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        ws.on('close', () => {
            console.log('Cliente desconectado');
            clients = clients.filter((client) => client !== ws);
        });
    });

    console.log('Servidor WebSocket iniciado.');
};


module.exports = { initWebSocket };