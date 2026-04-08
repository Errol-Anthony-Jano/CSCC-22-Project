import { Sequelize } from "sequelize";

export const up = async ({ context: queryInterface }) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    await queryInterface.renameColumn('transactions', 'is_invalidated', 'invalidated_at', { transaction });

    await queryInterface.changeColumn('transactions', 'invalidated_at', {
      type: `TIMESTAMP WITH TIME ZONE USING (
              CASE 
              WHEN invalidated_at = true THEN NOW() 
              ELSE NULL 
            END
      )`,
      allowNull: true,
      defaultValue: null,
    }, { transaction })

    await transaction.commit();
  }
  catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export const down = async ({ context: queryInterface }) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    await queryInterface.sequelize.query(
      `ALTER TABLE transactions 
       ALTER COLUMN invalidated_at TYPE BOOLEAN 
       USING (CASE WHEN invalidated_at IS NULL THEN false ELSE true END)`,
      { transaction }
    );

    await queryInterface.renameColumn('transactions', 'invalidated_at', 'is_invalidated', { transaction });

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

