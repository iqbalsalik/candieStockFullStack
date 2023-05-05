const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Candie = sequelize.define("Candies",{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    candieName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    candieDescription:{
        type:Sequelize.STRING,
        allowNull:false
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

module.exports = Candie