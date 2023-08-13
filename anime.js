const express = require('express');
const Sequelize  = require('sequelize');
const seq = require('../util/Database');

const Anime = seq.define('Anime',{

id:{
type:Sequelize.INTEGER,
allowNull:false,
autoIncrement:true,
primaryKey:true

},
title:{type:Sequelize.STRING,
    allowNull:false
},
genre:{type:Sequelize.STRING,
    allowNull:false
},
episodes:{type:Sequelize.INTEGER,
    allowNull:false
},
imageUrl:{type:Sequelize.STRING(1000),
    allowNull:false

}



});


module.exports=Anime;
