'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Schedule.init({
        schedule_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employee_id: DataTypes.INTEGER,
        session_id: DataTypes.INTEGER,
        date: DataTypes.DATEONLY,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Schedule',
        tableName: 'schedules'
    });
    return Schedule;
};