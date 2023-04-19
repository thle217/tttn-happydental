'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('appointments', {
            appointment_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customer_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            creator_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            schedule_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            is_for_another: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            fullname: {
                type: Sequelize.STRING
            },
            dob: {
                type: Sequelize.DATEONLY
            },
            gender: {
                type: Sequelize.BOOLEAN
            },
            phone: {
                type: Sequelize.CHAR(10)
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
        await queryInterface.dropTable('appointments');
    }
};