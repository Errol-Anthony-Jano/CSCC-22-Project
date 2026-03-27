import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class products extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    product_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    business_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'businesses',
        key: 'business_id'
      }
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "uq_product_name"
    },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_price_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'products',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_product_id",
        unique: true,
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "uq_product_name",
        unique: true,
        fields: [
          { name: "product_name" },
        ]
      },
    ]
  });
  }
}
