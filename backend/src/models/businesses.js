import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class businesses extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    business_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    business_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "uq_business_name"
    }
  }, {
    sequelize,
    tableName: 'businesses',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_business_id",
        unique: true,
        fields: [
          { name: "business_id" },
        ]
      },
      {
        name: "uq_business_name",
        unique: true,
        fields: [
          { name: "business_name" },
        ]
      },
    ]
  });
  }
}
