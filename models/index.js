const sequelize = require('../config/database');

const User = require('./User');
const Product = require('./Product');
const Community = require('./Community');

User.hasMany(Product, { foreignKey: 'userId', as: 'seller' });
User.hasMany(Community, { foreignKey: 'userId', as: 'owner' });

module.exports = {
    User,
    Product,
    Community
}