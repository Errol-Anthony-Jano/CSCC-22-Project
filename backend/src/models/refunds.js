import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class refunds extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    refund_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'transactions',
        key: 'transaction_id'
      }
    },
    refund_timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'refunds',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_refund_id",
        unique: true,
        fields: [
          { name: "refund_id" },
        ]
      },
    ]
  });
  }
}
