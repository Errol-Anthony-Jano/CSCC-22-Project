import { Sequelize } from "sequelize";
import { Umzug, SequelizeStorage } from "umzug";

import { sequelize } from "./db.js";

const umzug = new Umzug({
  migrations: { glob: 'src/migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})

if (import.meta.url === `file://${process.argv[1]}`) {
  umzug.runAsCLI();
}
