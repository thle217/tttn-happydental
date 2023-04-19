'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('appointments_details', {
            appointment_detail_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            appointment_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            doctor_category_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            service_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.STRING
            },
            file: {
                type: Sequelize.BLOB('medium')
            },
            subtotal: {
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
        await queryInterface.dropTable('appointments_details');
    }
};