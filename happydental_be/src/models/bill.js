'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Bill.init({
        bill_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        appointment_id: DataTypes.INTEGER,
        total: DataTypes.INTEGER,
        method: DataTypes.INTEGER,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Bill',
        tableName: 'bills'
    });
    return Bill;
};