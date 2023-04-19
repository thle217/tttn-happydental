const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: "mysql",
        logging: false,
        query: {
            "raw": true
        },
        timezone: "+07:00"
    }
);

let connect = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connect successfully");
    } catch (e) {
        console.error("Cannot connect");
    }
};

export default connect;