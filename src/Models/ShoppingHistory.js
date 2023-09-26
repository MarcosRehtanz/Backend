import { DataTypes } from "sequelize";

export const shoppingHistory = (sequelize) =>{
    sequelize.define('ShoppingHistory', {
        IDShopHistory: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        billDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        totalAmount: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    });
};