import models, { sequelize } from "../config/db.js";

export const insertTransaction = async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
        const user = await models.users.findByPk(req.body.created_by);
        if (!user) {
            await transaction.rollback();
            return res.status(404).json("User not found.");
        }

        const { items, ...transactionData } = req.body;

        const newTransaction = await models.transactions.create(transactionData, { transaction })
        const transactionItems = await models.transactions.bulkCreate(items, { transaction });

        await transaction.commit();
        res.status(200).json({ message: "Transaction recorded successfully.", });
    }
    catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: "Error inserting transaction." })
    }
}