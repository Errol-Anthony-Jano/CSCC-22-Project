import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

import { sequelize } from "./db.js";

const umzug = new Umzug({
  migrations: { glob: 'migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})

await umzug.up();
