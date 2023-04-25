'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            user_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            role_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            fullname: {
                allowNull: false,
                type: Sequelize.STRING
            },
            avatar: {
                type: Sequelize.STRING
            },
            dob: {
                allowNull: false,
                type: Sequelize.DATEONLY
            },
            gender: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            phone: {
                allowNull: false,
                type: Sequelize.CHAR(10)
            },
            degree: {
                type: Sequelize.STRING
            },
            start_date: {
                type: Sequelize.DATEONLY
            },
            street: {
                type: Sequelize.STRING
            },
            ward: {
                type: Sequelize.STRING
            },
            district: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(100)
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING
            },
            is_verified: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            refresh_token: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('users');
    }
};