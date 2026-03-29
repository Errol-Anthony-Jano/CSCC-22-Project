import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class transaction_items extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'transactions',
        key: 'transaction_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'transaction_items',
    schema: 'public',
    timestamps: false
  });
  }
}
