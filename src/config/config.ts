import { SequelizeOptions } from "sequelize-typescript";
import * as dotenv from "dotenv";

dotenv.config();

interface Config {
  development: SequelizeOptions;
  test: SequelizeOptions;
  production: SequelizeOptions;
}

const config: Config = {
  development: {
    username: process.env.DB_USER ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME ,
    host: process.env.DB_HOST ,
    port: parseInt(process.env.DB_PORT || "3000", 10),
    dialect: "mssql",
    dialectOptions: {
      Options: {
        encrypt: false,
        trustSeverCertificate: true,
      },
    },
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {},
  },
  test: {
    username: process.env.TESTDB_USER ,
    password: process.env.TESTDB_PASSWORD,
    database: process.env.TESTDB_NAME ,
    host: process.env.TESTDB_HOST ,
    port: parseInt(process.env.TESTDB_PORT || "3000", 10),
    dialect: "mssql",
    logging: console.log,
    pool: {
      max: 5,
    },
  },
  production: {
    username: process.env.PRODDB_USER ,
    password: process.env.PRODDB_PASSWORD ,
    database: process.env.PRODDB_NAME ,
    host: process.env.PRODDB_HOST ,
    port: parseInt(process.env.PRODDB_PORT || "3000", 10),
    dialect: "mssql",
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {},
  },
};

export default config;