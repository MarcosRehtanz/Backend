import { DataTypes } from "sequelize";

export const shoppingHistory = (sequelize) =>{
    sequelize.define('ShoppingHistory', {
        IDShopHistory: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
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