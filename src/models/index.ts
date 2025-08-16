import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import config from "../config/config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env as keyof typeof config];

const sequelize = new Sequelize(dbConfig);

interface DB {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const db: DB = {} as DB;

fs.readdirSync(__dirname)
  .filter((file: string) => file.indexOf(".") !== 0 && file !== basename && file.endsWith(".ts"))
  .forEach((file: string) => {
    const imported = require(path.join(__dirname, file));
    const modelDef = imported.default || imported;

    if (typeof modelDef === "function") {
      const model = modelDef(sequelize, DataTypes);
      db[model.name] = model;
    }
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ Connected to DB: ${await sequelize.getDatabaseName()}`);

    await sequelize.sync({ force: false });
    console.log("✅ Tables are synced with database");

    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log("📋 Tables in DB:", tables);
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
};

export default db;
export { sequelize };
