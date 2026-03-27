import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    user_id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_username_email_pass_salt_key"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "users_username_email_pass_salt_key"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pass_salt: {
      type: DataTypes.BLOB,
      allowNull: false,
      unique: "users_username_email_pass_salt_key"
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "users_username_email_pass_salt_key",
        unique: true,
        fields: [
          { name: "username" },
          { name: "email" },
          { name: "pass_salt" },
        ]
      },
    ]
  });
  }
}
