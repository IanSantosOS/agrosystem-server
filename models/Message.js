const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ajuste o caminho para o arquivo de configuração

const Message = sequelize.define('Message', {
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    communityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Message;
