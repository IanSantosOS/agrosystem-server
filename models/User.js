const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('name', value);
        },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('username', value);
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('email', value);
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Hook para hash da senha antes de salvar o usuário no banco de dados
User.beforeCreate(async (user, options) => {
    user.password = await hash(user.password);
});

async function hash(word) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(word, salt);
}

module.exports = User;