'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class DoctorCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    DoctorCategory.init({
        doctor_category_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        doctor_id: DataTypes.INTEGER,
        category_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'DoctorCategory',
        tableName: 'doctors_categories'
    });
    return DoctorCategory;
};