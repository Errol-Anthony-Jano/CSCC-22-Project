import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class payment_types extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    payment_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    payment_type_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "uq_payment_type_name"
    }
  }, {
    sequelize,
    tableName: 'payment_types',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_payment_type_id",
        unique: true,
        fields: [
          { name: "payment_type_id" },
        ]
      },
      {
        name: "uq_payment_type_name",
        unique: true,
        fields: [
          { name: "payment_type_name" },
        ]
      },
    ]
  });
  }
}
