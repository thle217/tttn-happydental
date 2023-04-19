'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Service.init({
        service_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category_id: DataTypes.INTEGER,
        service_name: DataTypes.STRING,
        price: DataTypes.INTEGER,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Service',
        tableName: 'services'
    });
    return Service;
};