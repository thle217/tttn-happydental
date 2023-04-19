'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('services', {
            service_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            category_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            service_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            price: {
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
        await queryInterface.dropTable('services');
    }
};