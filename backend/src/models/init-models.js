import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _businesses from  "./businesses.js";
import _payment_types from  "./payment_types.js";
import _products from  "./products.js";
import _refunds from  "./refunds.js";
import _transactions from  "./transactions.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const businesses = _businesses.init(sequelize, DataTypes);
  const payment_types = _payment_types.init(sequelize, DataTypes);
  const products = _products.init(sequelize, DataTypes);
  const refunds = _refunds.init(sequelize, DataTypes);
  const transactions = _transactions.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  products.belongsTo(businesses, { as: "business", foreignKey: "business_id"});
  businesses.hasMany(products, { as: "products", foreignKey: "business_id"});
  refunds.belongsTo(businesses, { as: "business", foreignKey: "business_id"});
  businesses.hasMany(refunds, { as: "refunds", foreignKey: "business_id"});
  transactions.belongsTo(businesses, { as: "business", foreignKey: "business_id"});
  businesses.hasMany(transactions, { as: "transactions", foreignKey: "business_id"});
  transactions.belongsTo(payment_types, { as: "payment_type", foreignKey: "payment_type_id"});
  payment_types.hasMany(transactions, { as: "transactions", foreignKey: "payment_type_id"});
  transactions.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(transactions, { as: "transactions", foreignKey: "product_id"});
  refunds.belongsTo(transactions, { as: "transaction", foreignKey: "transaction_id"});
  transactions.hasMany(refunds, { as: "refunds", foreignKey: "transaction_id"});

  return {
    businesses,
    payment_types,
    products,
    refunds,
    transactions,
    users,
  };
}
