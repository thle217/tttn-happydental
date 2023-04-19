'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('doctors_categories', {
            doctor_category_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctor_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            category_id: {
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
        await queryInterface.dropTable('doctors_categories');
    }
};