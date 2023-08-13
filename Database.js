const Sequelize = require("sequelize");

const sequelize = new Sequelize('node_project','root','2003Nr123',{
    dialect:'mysql',
    host:'localhost'
});

module.exports= sequelize;