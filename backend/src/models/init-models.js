import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _products from "./products.js";
import _refunds from "./refunds.js";
import _transaction_items from "./transaction_items.js";
import _transactions from "./transactions.js";

export default function initModels(sequelize) {
  const products = _products.init(sequelize, DataTypes);
  const refunds = _refunds.init(sequelize, DataTypes);
  const transaction_items = _transaction_items.init(sequelize, DataTypes);
  const transactions = _transactions.init(sequelize, DataTypes);

  transaction_items.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(transaction_items, { as: "transaction_items", foreignKey: "product_id" });
  refunds.belongsTo(transactions, { as: "transaction", foreignKey: "transaction_id" });
  transactions.hasMany(refunds, { as: "refunds", foreignKey: "transaction_id" });
  transaction_items.belongsTo(transactions, { as: "transaction", foreignKey: "transaction_id" });
  transactions.hasMany(transaction_items, { as: "transaction_items", foreignKey: "transaction_id" });

  return {
    products,
    refunds,
    transaction_items,
    transactions,
  };
}
