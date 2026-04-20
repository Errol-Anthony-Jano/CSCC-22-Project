import { beforeAll, beforeEach, afterAll } from "vitest";
import { sequelize } from "../config/db.js";

beforeAll(async () => {
    if (process.env.NODE_ENV !== "test") {
        throw new Error("Error: Running tests while not in test mode strictly prohibited. Run npm test first.");
    }
    
    // Sync all models to the database by replacing old tables
    await sequelize.sync({ force: true });
})

afterAll(async () => {
    await sequelize.close();
}, 60000);