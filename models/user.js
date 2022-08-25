"use strict";
const { Model } = require("sequelize");
const {isBefore} = require('date-fns');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {  //Users->users
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {//UserId-> userId
      User.hasMany(models.Task, {
        foreignKey: "userId"
      });
    }
  }
  User.init(
    {
      firstName: {
        field: "first_name",
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      lastName: {
        field: "last_name",
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
          isEmail: true
        }
      },
      password: {
        field: "password_hash",
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        set(v){
          this.setDataValue('password', 'hash password')
        }
      },
      birthday: { 
        type: DataTypes.DATEONLY,
        validate:{
          isDate: true,
          isValidDate(value){
            if(isBefore(new Date(), new Date(value))){
              throw new Error('check your birthday')
            }
          }
        }
      },
      isMale: { 
        type: DataTypes.BOOLEAN,
        field: "is_male"
       },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users", //Users
      underscored: true
    }
  );
  return User;
};
