'use strict';
const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee.init({
    firstname:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Please enter your First Name'
        }
      }
    },
    lastname:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: {
          msg: 'Please enter your Last Name'
        }
      }
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      isEmail: true,  
      validate: {
        notNull: {
          msg: 'Please enter your email'
        }
      }
    },
    phonenumber:{
      type:DataTypes.STRING,
      allowNull:false,
      validate: {
        len: [5, 10],
        notNull: {
          msg: 'Please enter your email'
        }
      },
     
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
          },
  }, {
    comment: "I'm a table comment!",
    sequelize,
    modelName: 'employee',
  });
  return employee;
};