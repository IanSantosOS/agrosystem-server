const User = require('./User');
const Product = require('./Product');
const Community = require('./Community');
const Message = require('./Message');

User.hasMany(Product, { foreignKey: 'userId', as: 'seller' });
User.hasMany(Community, { foreignKey: 'userId', as: 'owner' });

Community.hasMany(Message, { foreignKey: 'communityId', as: 'community' });

module.exports = {
    User,
    Product,
    Community,
    Message
}
