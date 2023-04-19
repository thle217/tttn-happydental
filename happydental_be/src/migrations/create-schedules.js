'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('schedules', {
            schedule_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            employee_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            session_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            date: {
                allowNull: false,
                type: Sequelize.DATEONLY
            },
            status: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                type: Sequelize.DATEONLY
            },
            updatedAt: {
                type: Sequelize.DATEONLY
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('schedules');
    }
};