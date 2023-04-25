'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User.init({
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role_id: DataTypes.INTEGER,
        fullname: DataTypes.STRING,
        avatar: DataTypes.STRING,
        dob: DataTypes.DATEONLY,
        gender: DataTypes.BOOLEAN,
        phone: DataTypes.CHAR(10),
        degree: DataTypes.STRING,
        start_date: DataTypes.DATEONLY,
        street: DataTypes.STRING,
        ward: DataTypes.STRING,
        district: DataTypes.STRING,
        city: DataTypes.STRING,
        email: DataTypes.STRING(100),
        password: DataTypes.STRING,
        is_verified: DataTypes.BOOLEAN,
        refresh_token: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users'
    });
    return User;
};