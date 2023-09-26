import { DataTypes } from "sequelize";

export const shoppingHistory = (sequelize) =>{
    sequelize.define('ShoppingHistory', {
        IDShopHistory: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        billDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    });
};