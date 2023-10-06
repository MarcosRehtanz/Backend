import { DataTypes } from "sequelize";

export const shoppingHistory = (sequelize) => {
  sequelize.define("ShoppingHistory", {
    IDShopHistory: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    operationId: {
      type: DataTypes.INTEGER,
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
    paymentMethodId: {
      type: DataTypes.STRING,
    },
    netAmount: {
      type: DataTypes.FLOAT,
    },
    taxes: {
      type: DataTypes.FLOAT,
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  });
};
