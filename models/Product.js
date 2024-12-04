const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('name', value);
        },
    },
    price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        validate: {
            min: 0,
        },
        set(value) {
            this.setDataValue('price', value);
        },
    },
    qnt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
        },
        set(value) {
            this.setDataValue('qnt', value);
        },
    }
});

module.exports = Product;