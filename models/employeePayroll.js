'use strict';
const {  Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employeePayroll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employeePayroll.init({
    departmentName: {
			type: DataTypes.STRING
		},
    roleName: {
			type: DataTypes.STRING
		},dayCount: {
			type: DataTypes.STRING
		},amountPayable: {
			type: DataTypes.STRING
		},
    totalAmount:{
      type:DataTypes.STRING
          },
  }, {
    comment: "I'm a table comment!",
    sequelize,
    modelName: 'employeePayroll',
  });
  return employeePayroll;
};