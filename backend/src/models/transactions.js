import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class transactions extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      transaction_id: {
        autoIncrement: true,
        autoIncrementIdentity: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      transaction_timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('now')
      },
      payment_type: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      is_invalidated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    }, {
      sequelize,
      tableName: 'transactions',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: "pk_transaction_id",
          unique: true,
          fields: [
            { name: "transaction_id" },
          ]
        },
      ]
    });
  }
}
