import { beforeAll, beforeEach, afterAll } from "vitest";
import { sequelize } from "../config/db.js";

beforeAll(async () => {
    if (process.env.NODE_ENV !== "test") {
        throw new Error("Error: Running tests while not in test mode strictly prohibited. Run npm test first.");
    }
    console.log("Registered Models:", Object.keys(sequelize.models));
    
    await sequelize.model('users').sync({ force: true });
    await sequelize.model('products').sync({ force: true });
    await sequelize.model('transactions').sync({ force: true });
    await sequelize.model('transaction_items').sync({ force: true });
})

beforeEach(async () => {
    const models = Object.values(sequelize.models);

    for (const model of models) {
        if (model.tableName !== "SequelizeMeta") {
            await model.destroy({
                where: {},
                truncate: true,
                cascade: true,
                restartIdentity: true
            });
        }
    }
})

afterAll(async () => {
    await sequelize.close();
}, 60000);