const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Community = sequelize.define('community', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('title', value);
        },
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('description', value);
        },
    },
});

module.exports = Community;