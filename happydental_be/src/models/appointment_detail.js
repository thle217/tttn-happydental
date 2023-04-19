'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AppointmentDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    AppointmentDetail.init({
        appointment_detail_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        appointment_id: DataTypes.INTEGER,
        doctor_category_id: DataTypes.INTEGER,
        service_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER,
        description: DataTypes.STRING,
        file: DataTypes.BLOB('medium'),
        subtotal: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'AppointmentDetail',
        tableName: 'appointments_details'
    });
    return AppointmentDetail;
};