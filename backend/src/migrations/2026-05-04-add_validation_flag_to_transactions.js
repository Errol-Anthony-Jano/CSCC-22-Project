import { Sequelize } from "sequelize";

export const up = async ({ context: queryInterface }) => {
  const transaction = await queryInterface.sequelize.transaction();

  try {
    await queryInterface.addColumn('transactions', 'is_invalidated', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })

    await queryInterface.addColumn('transaction_items', 'is_invalidated', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })

    await queryInterface.addColumn('refunds', 'is_invalidated', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })

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
    await queryInterface.removeColumn('transactions', 'is_invalidated');
    await queryInterface.removeColumn('transaction_items', 'is_invalidated');
    await queryInterface.removeColumn('refunds', 'is_invalidated');

  }
  catch (err) {
    await transaction.rollback();
    throw err;
  }
}

