 const express = require('express');
const Sequelize  = require('sequelize');
const seq = require('../util/Database');

const Users = seq.define('users',{
    id:{type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
    },
    name:{type:Sequelize.STRING,
        allowNull:false
    
},
    email:{type:Sequelize.STRING,
        allowNull:false,
    },
    password:{type:Sequelize.STRING,
        allowNull:false
    },

picUrl:{type:Sequelize.STRING,
},
resetToken:{type:Sequelize.STRING},
resetTokenExpiration:{type:Sequelize.STRING}

}
)

module.exports = Users;

