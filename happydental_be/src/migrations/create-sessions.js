'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sessions', {
            session_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            time: {
                allowNull: false,
                type: Sequelize.STRING
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
        await queryInterface.dropTable('sessions');
    }
};