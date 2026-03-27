import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import initModels from '../models/init-models.js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../../.env') });

const DB_URL = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@db:5432/${process.env.PG_DB}`

export const sequelize = new Sequelize(DB_URL)

export const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const models = initModels(sequelize);

export default models;
