'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Appointment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Appointment.init({
        appointment_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customer_id: DataTypes.INTEGER,
        creator_id: DataTypes.INTEGER,
        schedule_id: DataTypes.INTEGER,
        is_for_another: DataTypes.BOOLEAN,
        fullname: DataTypes.STRING,
        dob: DataTypes.DATEONLY,
        gender: DataTypes.BOOLEAN,
        phone: DataTypes.CHAR(10),
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Appointment',
        tableName: 'appointments'
    });
    return Appointment;
};