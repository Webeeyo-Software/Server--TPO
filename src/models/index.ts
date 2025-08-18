import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config';

const basename = path.basename(__filename);
const db: any = {};

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

const sequelize = new Sequelize(dbConfig);

// Read all model files in the current directory
fs.readdirSync(__dirname)
  .filter((file: string) => file !== 'index.ts')
  .forEach((file: string) => {
    const modelModule = require(path.join(__dirname, file));
    const model = modelModule.default || modelModule; // handle both cases
    if (typeof model === 'function') {
      model(sequelize, DataTypes);
    }
  });


  // console.log("Here is the DB Object : ", db);

  
//.
// Set up associations between models
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// console.log("Here is the DB Object, Bigger me : ", db);

export const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connection has been established successfully.');

        await sequelize.sync({force: false});
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

export default db;
export { sequelize };








