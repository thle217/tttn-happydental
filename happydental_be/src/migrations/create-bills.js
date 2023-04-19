'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bills', {
            bill_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            appointment_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            total: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            method: {
                allowNull: false,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('bills');
    }
};